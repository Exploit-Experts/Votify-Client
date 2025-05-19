import { Component } from '@angular/core';
import { FooterComponent } from "@shared/components/footer/footer.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { HeroComponent } from "@shared/components/hero/hero.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [FooterComponent, HeaderComponent, HeroComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {

}
