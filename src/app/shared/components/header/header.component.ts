import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [ CommonModule , MenubarModule, RouterLink, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
