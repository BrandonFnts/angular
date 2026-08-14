import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  sku: string;
  precio: number;
  stock: number;
}

const PRODUCTOS_MOCK: Producto[] = [
  // Cervezas
  { id: 1, nombre: 'Corona Extra 355ml', sku: 'CER-001', precio: 22.00, stock: 120 },
  { id: 2, nombre: 'Corona Extra Mega 1.2L', sku: 'CER-002', precio: 52.00, stock: 48 },
  { id: 3, nombre: 'Modelo Especial 355ml', sku: 'CER-003', precio: 22.00, stock: 96 },
  { id: 4, nombre: 'Modelo Negra 355ml', sku: 'CER-004', precio: 24.00, stock: 60 },
  { id: 5, nombre: 'Victoria 355ml', sku: 'CER-005', precio: 20.00, stock: 84 },
  { id: 6, nombre: 'Pacífico 355ml', sku: 'CER-006', precio: 22.00, stock: 72 },
  { id: 7, nombre: 'Tecate Light 355ml', sku: 'CER-007', precio: 18.00, stock: 90 },
  { id: 8, nombre: 'Heineken 355ml', sku: 'CER-008', precio: 28.00, stock: 60 },
  { id: 9, nombre: 'Michelob Ultra 355ml', sku: 'CER-009', precio: 26.00, stock: 48 },
  // Licores & Tequilas
  { id: 10, nombre: 'Bacardí Blanco 750ml', sku: 'LIC-001', precio: 175.00, stock: 14 },
  { id: 11, nombre: 'Caballito Cerrero Mezcal 750ml', sku: 'LIC-002', precio: 350.00, stock: 10 },
  { id: 12, nombre: 'Don Julio Blanco 700ml', sku: 'LIC-003', precio: 520.00, stock: 8 },
  { id: 13, nombre: 'Jimador Reposado 700ml', sku: 'LIC-004', precio: 195.00, stock: 15 },
  { id: 14, nombre: 'Smirnoff Vodka 750ml', sku: 'LIC-005', precio: 180.00, stock: 12 },
  { id: 15, nombre: 'Tonayán 1L', sku: 'LIC-006', precio: 45.00, stock: 30 },
  // Refrescos
  { id: 16, nombre: 'Coca-Cola 600ml', sku: 'REF-001', precio: 18.50, stock: 100 },
  { id: 17, nombre: 'Coca-Cola 2L', sku: 'REF-002', precio: 36.00, stock: 40 },
  { id: 18, nombre: 'Fanta Naranja 600ml', sku: 'REF-003', precio: 18.00, stock: 45 },
  { id: 19, nombre: 'Jarritos Tamarindo 600ml', sku: 'REF-004', precio: 15.00, stock: 36 },
  { id: 20, nombre: 'Pepsi 600ml', sku: 'REF-005', precio: 17.00, stock: 60 },
  { id: 21, nombre: 'Squirt 600ml', sku: 'REF-006', precio: 18.00, stock: 40 },
  { id: 22, nombre: 'Sprite 600ml', sku: 'REF-007', precio: 18.00, stock: 50 },
  // Aguas & Hidratantes
  { id: 23, nombre: 'Agua Ciel 600ml', sku: 'AGU-001', precio: 9.00, stock: 100 },
  { id: 24, nombre: 'Agua Ciel 1L', sku: 'AGU-002', precio: 12.00, stock: 80 },
  { id: 25, nombre: 'Electrolit Fresa 625ml', sku: 'AGU-003', precio: 24.00, stock: 30 },
  { id: 26, nombre: 'Jumex Mango 335ml', sku: 'JUG-001', precio: 12.00, stock: 48 },
  // Botanas
  { id: 27, nombre: 'Cacahuates Japoneses 110g', sku: 'BOT-001', precio: 18.00, stock: 45 },
  { id: 28, nombre: 'Doritos Nacho 62g', sku: 'BOT-002', precio: 24.00, stock: 40 },
  { id: 29, nombre: 'Ruffles Queso 50g', sku: 'BOT-003', precio: 22.00, stock: 35 },
  { id: 30, nombre: 'Sabritas Original 45g', sku: 'BOT-004', precio: 22.00, stock: 50 },
  { id: 31, nombre: 'Takis Fuego 62g', sku: 'BOT-005', precio: 24.00, stock: 55 },
  { id: 32, nombre: 'Totis Donitas 50g', sku: 'BOT-006', precio: 12.00, stock: 60 },
  // Cigarros & Extras Depósito
  { id: 33, nombre: 'Bolsa de Hielo 5kg', sku: 'HIE-001', precio: 30.00, stock: 25 },
  { id: 34, nombre: 'Camel Azul 20pz', sku: 'CIG-001', precio: 70.00, stock: 15 },
  { id: 35, nombre: 'Limones 1kg', sku: 'EXT-001', precio: 35.00, stock: 15 },
  { id: 36, nombre: 'Marlboro Rojo 20pz', sku: 'CIG-002', precio: 72.00, stock: 20 },
  { id: 37, nombre: 'Sal de Gusano 50g', sku: 'EXT-002', precio: 40.00, stock: 10 },
  { id: 38, nombre: 'Vasos Rojos 25pz', sku: 'EXT-003', precio: 45.00, stock: 20 },
].sort((a, b) => a.nombre.localeCompare(b.nombre));

@Injectable({ providedIn: 'root' })
export class ProductosService {

  getProductos(): Promise<Producto[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...PRODUCTOS_MOCK]), 200);
    });
  }

  getPrimeros(limit: number = 8): Promise<Producto[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(PRODUCTOS_MOCK.slice(0, limit)), 100);
    });
  }

  buscarProducto(term: string): Promise<Producto[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanTerm = term.trim().toLowerCase();
        if (!cleanTerm) {
          resolve(PRODUCTOS_MOCK.slice(0, 8));
          return;
        }

        const resultados = PRODUCTOS_MOCK.filter(
          (p) =>
            p.nombre.toLowerCase().includes(cleanTerm) ||
            p.sku.toLowerCase().includes(cleanTerm)
        );
        resolve(resultados);
      }, 150);
    });
  }

  getProductoPorId(id: number): Producto | undefined {
    return PRODUCTOS_MOCK.find((p) => p.id === id);
  }
}
