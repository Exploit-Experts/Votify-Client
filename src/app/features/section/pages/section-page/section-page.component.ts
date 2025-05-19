import { Component } from '@angular/core';
import { FooterComponent } from "@shared/components/footer/footer.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { HeroComponent } from "@shared/components/hero/hero.component";

@Component({
  selector: 'app-section-page',
  imports: [FooterComponent, HeaderComponent, HeroComponent],
  templateUrl: './section-page.component.html',
  styleUrl: './section-page.component.scss'
})
export class SectionPageComponent {

}
