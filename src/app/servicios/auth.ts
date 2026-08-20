import { Injectable } from '@angular/core';

export type Rol = 'administrador' | 'cajero' | 'almacenista' | 'cliente';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioActual: Usuario | null = null;
  private usuariosCached: Usuario[] | null = null;

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

  private async getUsuarios(): Promise<Usuario[]> {
    if (this.usuariosCached) {
      return this.usuariosCached;
    }
    try {
      const response = await fetch('/mocks/usuarios.json');
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo de usuarios');
      }
      this.usuariosCached = await response.json();
      return this.usuariosCached || [];
    } catch (error) {
      console.error('Error cargando usuarios mock:', error);
      return [];
    }
  }

  async login(email: string, password: string): Promise<Usuario> {
    const usuarios = await this.getUsuarios();
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuario = usuarios.find(
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
