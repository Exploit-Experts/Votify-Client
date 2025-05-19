import { Routes } from '@angular/router';
import { MainComponent } from '@features/home/pages/main/main.component';
import { SectionPageComponent } from '@features/section/pages/section-page/section-page.component';
import { LoginPageComponent } from '@features/login/pages/login-page/login-page.component';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'menu',
    canActivate: [authGuard],
    component: MainComponent,
  },
  {
    path: 'sections',
    canActivate: [authGuard],
    component: SectionPageComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
