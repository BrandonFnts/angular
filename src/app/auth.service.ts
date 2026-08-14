import { Injectable } from '@angular/core';

export type Rol = 'administrador' | 'cajero' | 'almacenista' | 'cliente';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

const USUARIOS_MOCK: Usuario[] = [
  { id: 1, nombre: 'Administrador', email: 'admin@correo.com', password: 'Admin123!', rol: 'administrador' },
  { id: 2, nombre: 'Carlos Cajero', email: 'cajero@correo.com', password: 'Cajero123!', rol: 'cajero' },
  { id: 3, nombre: 'Ana Almacén', email: 'almacen@correo.com', password: 'Almacen123!', rol: 'almacenista' },
  { id: 4, nombre: 'Pedro Cliente', email: 'cliente@correo.com', password: 'Cliente123!', rol: 'cliente' },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioActual: Usuario | null = null;

  constructor() {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      try {
        this.usuarioActual = JSON.parse(stored);
      } catch {
        localStorage.removeItem('usuario');
      }
    }
  }

  login(email: string, password: string): Promise<Usuario> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuario = USUARIOS_MOCK.find(
          (u) => u.email === email && u.password === password
        );
        if (usuario) {
          this.usuarioActual = usuario;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          resolve(usuario);
        } else {
          reject('Correo o contraseña incorrectos');
        }
      }, 500);
    });
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
  }

  getUsuario(): Usuario | null {
    return this.usuarioActual;
  }

  getRol(): Rol | null {
    return this.usuarioActual?.rol ?? null;
  }

  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }
}
