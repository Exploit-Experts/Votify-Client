import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Session } from '@core/models/session.model';
import { SessionService } from '@core/services/session.service';
import { SectionCardComponent } from '@shared/components/cards/section-card/section-card.component';

@Component({
  standalone: true,
  selector: 'app-sections',
  imports: [SectionCardComponent, CommonModule, RouterModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
})
export class SessionsComponent implements OnInit {
  sessions: Session[] = [];
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.loadSessions();
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
        let allSessions: Session[];
        if (response.results) {
          allSessions = response.results;
        } else {
          allSessions = response;
        }
        this.sessions = allSessions.slice(0, 2);
      },
      error: (error) => {
        console.error('Error fetching sessions:', error);
      },
    });
  }
}
