import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Rol } from './servicios/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const expectedRoles = route.data?.['roles'] as Rol[] | undefined;
  if (expectedRoles) {
    const userRol = authService.getRol();
    if (!userRol || !expectedRoles.includes(userRol)) {
      return router.createUrlTree(['/punto-venta']);
    }
  }

  return true;
};
