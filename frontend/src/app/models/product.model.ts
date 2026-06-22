export interface Product {
  productoId: number;
  nombre: string;
  cantidad: number;
}

export interface ProductMovimiento {
  productoId: number;
  tipoMovimiento: string;
  cantidad: number;
}