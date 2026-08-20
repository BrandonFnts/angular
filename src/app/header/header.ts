import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService, Rol } from '../servicios/auth';

interface MenuOption {
  label: string;
  icon: string;
  route: string;
  roles: Rol[];
}

const MENU_OPTIONS: MenuOption[] = [
  { label: 'Registro Horas', icon: 'bi-clock', route: '/registro-horas', roles: ['administrador', 'cajero', 'almacenista'] },
  { label: 'Productos', icon: 'bi-box-seam', route: '/productos', roles: ['administrador', 'almacenista'] },
  { label: 'Reportes', icon: 'bi-bar-chart', route: '/reportes', roles: ['administrador'] },
  { label: 'Empleados', icon: 'bi-people', route: '/empleados', roles: ['administrador'] },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  menuOpen = false;
  today = new Date();

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  get nombreUsuario(): string {
    return this.auth.getUsuario()?.nombre ?? 'Usuario';
  }

  get rolUsuario(): string {
    return this.auth.getRol() ?? '';
  }

  get menuOptions(): MenuOption[] {
    const rol = this.auth.getRol();
    if (!rol) return [];
    return MENU_OPTIONS.filter((opt) => opt.roles.includes(rol));
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.closeMenu();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
