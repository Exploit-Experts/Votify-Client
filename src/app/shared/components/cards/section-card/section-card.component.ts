import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Session } from '@core/models/session.model';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { SessionService } from '@core/services/session.service';

@Component({
  standalone: true,
  selector: 'app-section-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent implements OnInit {
  @Input() session?: Session;
  @Output() sessionUpdated = new EventEmitter<void>();
  @Output() sessionDeleted = new EventEmitter<number>();

  isEditing: boolean = false;
  private originalTitle: string = '';
  private originalDescription: string = '';
  currentUser: User | null = null;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.authService.personalInfo().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => console.error('Error loading user info:', error),
    });
  }

  get canEditSession(): boolean {
    return (
      this.currentUser?.role === 'ORGANIZER' ||
      this.currentUser?.role === 'ADMIN'
    );
  }

  editSession(): void {
    if (this.session) {
      this.originalTitle = this.session.title;
      this.originalDescription = this.session.description;
      this.isEditing = true;
    }
  }

  saveEdit(): void {
    if (this.session) {
      this.sessionService
        .updateSession(this.session.id, this.session)
        .subscribe({
          next: () => {
            this.isEditing = false;
            console.log('Session updated successfully');
            this.sessionUpdated.emit();
          },
          error: (error) => console.error('Error updating session:', error),
        });
    }
  }

  cancelEdit(): void {
    if (this.session) {
      this.session.title = this.originalTitle;
      this.session.description = this.originalDescription;
    }
    this.isEditing = false;
  }

  deleteSession(): void {
    if (this.session) {
      this.sessionService.deleteSession(this.session.id).subscribe({
        next: () => {
          console.log('Session deleted successfully');
          this.sessionDeleted.emit(this.session?.id);
        },
        error: (error) => console.error('Error deleting session:', error),
      });
    }
  }
}
