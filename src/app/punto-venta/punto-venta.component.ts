import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductoVenta {
  id: number;
  cantidad: number;
  producto: string;
  sku: string;
  precio: number;
}

@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './punto-venta.component.html',
  styleUrl: './punto-venta.component.scss',
})
export class PuntoVentaComponent {
  searchTerm = '';
  productos: ProductoVenta[] = [];

  private nextId = 1;

  get total(): number {
    return this.productos.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  }

  agregarProducto(): void {
    // TODO: abrir búsqueda / escanear producto
    this.productos.push({
      id: this.nextId++,
      cantidad: 1,
      producto: 'Producto ejemplo',
      sku: 'SKU-001',
      precio: 0,
    });
  }

  incrementar(item: ProductoVenta): void {
    item.cantidad++;
  }

  decrementar(item: ProductoVenta): void {
    if (item.cantidad > 1) {
      item.cantidad--;
    }
  }

  eliminar(id: number): void {
    this.productos = this.productos.filter((p) => p.id !== id);
  }

  cancelar(): void {
    this.productos = [];
  }

  cobrar(): void {
    if (this.productos.length === 0) return;
    // TODO: lógica de cobro
    console.log('Cobrar:', this.total);
  }
}
