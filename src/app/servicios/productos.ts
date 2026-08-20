import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  sku: string;
  precio: number;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private productosCached: Producto[] | null = null;

  private async fetchProductos(): Promise<Producto[]> {
    if (this.productosCached) {
      return this.productosCached;
    }
    try {
      const response = await fetch('/mocks/productos.json');
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo de productos');
      }
      const data: Producto[] = await response.json();
      this.productosCached = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      return this.productosCached;
    } catch (error) {
      console.error('Error cargando productos mock:', error);
      return [];
    }
  }

  async getProductos(): Promise<Producto[]> {
    const productos = await this.fetchProductos();
    return new Promise((resolve) => {
      setTimeout(() => resolve([...productos]), 200);
    });
  }

  async getPrimeros(limit: number = 8): Promise<Producto[]> {
    const productos = await this.fetchProductos();
    return new Promise((resolve) => {
      setTimeout(() => resolve(productos.slice(0, limit)), 100);
    });
  }

  async buscarProducto(term: string): Promise<Producto[]> {
    const productos = await this.fetchProductos();
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanTerm = term.trim().toLowerCase();
        if (!cleanTerm) {
          resolve(productos.slice(0, 8));
          return;
        }

        const resultados = productos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(cleanTerm) ||
            p.sku.toLowerCase().includes(cleanTerm)
        );
        resolve(resultados);
      }, 150);
    });
  }

  getProductoPorId(id: number): Producto | undefined {
    if (!this.productosCached) return undefined;
    return this.productosCached.find((p) => p.id === id);
  }

  actualizarStock(id: number, cantidadVendida: number): void {
    if (!this.productosCached) return;
    const producto = this.productosCached.find((p) => p.id === id);
    if (producto && producto.stock >= cantidadVendida) {
      producto.stock -= cantidadVendida;
    }
  }
}
