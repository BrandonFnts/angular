import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ProductosComponent } from './productos/productos';
import { PerfilesComponent } from './perfiles/perfiles';
import { RegistroHorasComponent } from './registro-horas/registro-horas';
import { UsuariosComponent } from './usuarios/usuarios';
import { RegistroComponent } from './registro/registro';
import { ReportesComponent } from './reportes/reportes';
import { AlertasComponent } from './alertas/alertas';
import { PuntoVentaComponent } from './punto-venta/punto-venta';
import { TicketComponent } from './ticket/ticket';
import { EmpleadosComponent } from './empleados/empleados';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'punto-venta', 
    component: PuntoVentaComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'productos', 
    component: ProductosComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador', 'almacenista'] } 
  },
  { 
    path: 'perfiles', 
    component: PerfilesComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador', 'cajero', 'almacenista'] } 
  },
  { 
    path: 'registro-horas', 
    component: RegistroHorasComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador', 'cajero', 'almacenista'] } 
  },
  { 
    path: 'usuarios', 
    component: UsuariosComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador'] } 
  },
  { 
    path: 'registro', 
    component: RegistroComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador'] } 
  },
  { 
    path: 'reportes', 
    component: ReportesComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador'] } 
  },
  { 
    path: 'alertas', 
    component: AlertasComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'ticket', 
    component: TicketComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador', 'cajero'] } 
  },
  { 
    path: 'empleados', 
    component: EmpleadosComponent, 
    canActivate: [authGuard], 
    data: { roles: ['administrador'] } 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
