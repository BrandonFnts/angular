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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'perfiles', component: PerfilesComponent },
  { path: 'registro-horas', component: RegistroHorasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'alertas', component: AlertasComponent },
  { path: 'punto-venta', component: PuntoVentaComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
