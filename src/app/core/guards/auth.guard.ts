import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth guard triggered, authenticated:', authService.isAuthenticated());

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigateByUrl('login');
  return false;
};
