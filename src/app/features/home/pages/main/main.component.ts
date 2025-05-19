import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "@shared/components/footer/footer.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { HeroComponent } from "@shared/components/hero/hero.component";
import { SessionsComponent } from "@features/home/components/sections/sessions.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [FooterComponent, HeaderComponent, HeroComponent, SessionsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('Main component initialized');
  }

}
