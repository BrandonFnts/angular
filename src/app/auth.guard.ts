import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, Rol } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Verificar si está logueado
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // 2. Verificar rol si la ruta requiere roles específicos
  const expectedRoles = route.data?.['roles'] as Rol[] | undefined;
  if (expectedRoles) {
    const userRol = authService.getRol();
    if (!userRol || !expectedRoles.includes(userRol)) {
      // Si no tiene el rol, lo mandamos a la ruta base de punto-venta
      return router.createUrlTree(['/punto-venta']);
    }
  }

  return true;
};
