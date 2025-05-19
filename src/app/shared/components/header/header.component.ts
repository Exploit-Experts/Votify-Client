import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [ CommonModule , MenubarModule, RouterLink, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  UserName: string = '';
  UserRole: string = '';

  constructor(private authService: AuthService) {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.personalInfo().subscribe(user => {
        this.UserName = user.name;
        this.UserRole = user.role;
      });
    }
  }
}
