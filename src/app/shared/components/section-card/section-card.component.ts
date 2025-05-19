import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Session } from '@core/models/session.model';

@Component({
  standalone: true,
  selector: 'app-section-card',
  imports: [CommonModule],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() session?: Session;
}
