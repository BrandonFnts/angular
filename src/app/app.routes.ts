import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { RegistroHorasComponent } from './registro-horas/registro-horas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AlertasComponent } from './alertas/alertas.component';
import { PuntoVentaComponent } from './punto-venta/punto-venta.component';
import { TicketComponent } from './ticket/ticket.component';
import { EmpleadosComponent } from './empleados/empleados.component';

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
