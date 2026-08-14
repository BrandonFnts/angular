import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductosService, Producto } from '../productos.service';

interface ItemVenta {
  id: number;
  productoId: number;
  nombre: string;
  sku: string;
  precio: number;
  cantidad: number;
}

@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './punto-venta.html',
  styleUrl: './punto-venta.scss',
})
export class PuntoVentaComponent implements OnInit {
  searchTerm = '';
  sugerencias: Producto[] = [];
  items: ItemVenta[] = [];
  showSugerencias = false;

  private nextId = 1;
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {}

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }

  async onSearchFocus(): Promise<void> {
    if (!this.searchTerm.trim()) {
      this.sugerencias = await this.productosService.getPrimeros(8);
      this.showSugerencias = this.sugerencias.length > 0;
    } else {
      this.onSearch();
    }
  }

  onSearch(): void {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    const term = this.searchTerm.trim();

    this.searchTimeout = setTimeout(async () => {
      if (!term) {
        this.sugerencias = await this.productosService.getPrimeros(8);
      } else {
        this.sugerencias = await this.productosService.buscarProducto(term);
      }
      this.showSugerencias = this.sugerencias.length > 0;
    }, 150);
  }

  seleccionarProducto(producto: Producto): void {
    const existente = this.items.find((i) => i.productoId === producto.id);
    if (existente) {
      if (existente.cantidad < producto.stock) {
        existente.cantidad++;
      }
    } else {
      this.items.push({
        id: this.nextId++,
        productoId: producto.id,
        nombre: producto.nombre,
        sku: producto.sku,
        precio: producto.precio,
        cantidad: 1,
      });
    }
    this.searchTerm = '';
    this.sugerencias = [];
    this.showSugerencias = false;
  }

  cerrarSugerencias(): void {
    setTimeout(() => {
      this.showSugerencias = false;
    }, 180);
  }

  incrementar(item: ItemVenta): void {
    const producto = this.productosService.getProductoPorId(item.productoId);
    if (producto && item.cantidad < producto.stock) {
      item.cantidad++;
    }
  }

  decrementar(item: ItemVenta): void {
    if (item.cantidad > 1) {
      item.cantidad--;
    }
  }

  eliminar(id: number): void {
    this.items = this.items.filter((i) => i.id !== id);
  }

  cancelar(): void {
    this.items = [];
  }

  cobrar(): void {
    if (this.items.length === 0) return;
    console.log('Cobrar total:', this.total);
    // TODO: lógica de cobro
    alert(`Venta realizada por $${this.total.toFixed(2)} MXN`);
    this.items = [];
  }
}
