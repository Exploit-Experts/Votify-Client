import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Session } from '@core/models/session.model';
import { User } from '@core/models/user.model';
import { AuthService } from '@core/services/auth.service';
import { SessionService } from '@core/services/session.service';
import { SectionCardComponent } from '@shared/components/cards/section-card/section-card.component';
import { SessionDialogComponent } from '@shared/components/dialogs/session-dialog/session-dialog.component';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { HeroComponent } from '@shared/components/hero/hero.component';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-section-page',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    SectionCardComponent,
    RouterModule,
    CommonModule,
    ButtonModule,
    DynamicDialogModule,
  ],
  templateUrl: './section-page.component.html',
  styleUrl: './section-page.component.scss',
  providers: [DialogService],
})
export class SectionPageComponent implements OnInit {
  sessions: Session[] = [];
  currentUser: User | null = null;
  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadSessions();
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

  get canCreateSession(): boolean {
    return (
      this.currentUser?.role === 'ORGANIZER' ||
      this.currentUser?.role === 'ADMIN'
    );
  }

  openSessionDialog(): void {
    const config: DynamicDialogConfig = {
      width: '500px',
      contentStyle: {
        'max-height': '80vh',
        overflow: 'auto',
        'border-radius': '8px',
      },
      baseZIndex: 10000,
      styleClass: 'session-dialog-container',
      maskStyleClass: 'session-dialog-mask',
      showHeader: true,
      dismissableMask: true,
      closeOnEscape: true,
      data: { isEdit: false },
    };

    this.dialogRef = this.dialogService.open(SessionDialogComponent, config);

    this.dialogRef.onClose.subscribe((result) => {
      if (result) {
        this.loadSessions();
      }
    });
  }

  onSessionUpdated(): void {
    this.loadSessions();
  }

  onSessionDeleted(sessionId: number): void {
    this.sessions = this.sessions.filter((session) => session.id !== sessionId);
  }

  private loadSessions(): void {
    this.sessionService.getSessionsWithAgendas().subscribe({
      next: (response: any) => {
        if (response.results) {
          this.sessions = response.results;
        } else {
          this.sessions = response;
        }
      },
      error: (error) => {
        console.error('Error fetching sessions:', error);
      },
    });
  }
}
