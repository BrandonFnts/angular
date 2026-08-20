import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductosService, Producto } from '../servicios/productos';

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
  encapsulation: ViewEncapsulation.None,
})
export class PuntoVentaComponent implements OnInit {
  searchTerm = '';
  sugerencias: Producto[] = [];
  items: ItemVenta[] = [];
  showSugerencias = false;

  showCobrarModal = false;
  montoPago: number | null = null;

  private nextId = 1;
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void { }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }

  get cambio(): number {
    if (this.montoPago === null || this.montoPago < this.total) {
      return 0;
    }
    return this.montoPago - this.total;
  }

  get pagoSuficiente(): boolean {
    if (this.montoPago === null) return false;
    return this.montoPago >= this.total;
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
    this.montoPago = null;
    this.showCobrarModal = true;
  }

  cancelarCobro(): void {
    this.showCobrarModal = false;
    this.montoPago = null;
  }

  pagarMontoExacto(): void {
    this.montoPago = this.total;
  }

  pagarConMonto(monto: number): void {
    this.montoPago = monto;
  }

  confirmarPago(): void {
    if (!this.pagoSuficiente) return;

    this.items.forEach((item) => {
      this.productosService.actualizarStock(item.productoId, item.cantidad);
    });

    console.log('Cobro registrado exitosamente por:', this.total, 'Pago:', this.montoPago, 'Cambio:', this.cambio);

    this.showCobrarModal = false;
    this.montoPago = null;
    this.items = [];
  }
}
