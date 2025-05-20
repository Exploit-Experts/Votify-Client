import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { SessionService } from '@core/services/session.service';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-session-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './session-dialog.component.html',
  styleUrl: './session-dialog.component.scss',
})
export class SessionDialogComponent implements OnInit {
  sessionForm!: FormGroup;
  submitting = false;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.initForm();
  }

  private loadCurrentUser(): void {
    this.authService.personalInfo().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => console.error('Error loading user info:', error),
    });
  }

  private initForm(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    this.sessionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      start_date: [tomorrow, Validators.required],
      end_date: [endDate, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.sessionForm.invalid || !this.currentUser) {
      return;
    }

    this.submitting = true;
    const formValue = this.sessionForm.value;

    const sessionData = {
      ...formValue,
      organizer_id: this.currentUser.id,
    };

    this.sessionService.createSession(sessionData).subscribe({
      next: (response) => {
        this.submitting = false;
        this.ref.close(response);
      },
      error: (err) => {
        console.error('Error creating session:', err);
        this.submitting = false;
      },
    });
  }

  onCancel(): void {
    this.ref.close();
  }
}
