import { Routes } from '@angular/router';
import { MainComponent } from '@features/home/pages/main/main.component';
import { SectionPageComponent } from '@features/section/pages/section-page/section-page.component';
import { LoginPageComponent } from '@features/login/pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'menu',
    component: MainComponent,
  },
  {
    path: 'sections',
    component: SectionPageComponent,
  },
];
