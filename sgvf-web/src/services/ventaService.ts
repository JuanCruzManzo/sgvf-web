import api from "./api";

export type EstadoPago = "Pagado" | "Pendiente";

export interface DetalleVenta {
  id: number;
  productoId: number;
  producto: string;
  cantidadCajones: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id: number;
  fecha: string;
  clienteId?: number | null;
  cliente: string;
  usuarioId: number;
  usuario: string;
  total: number;
  estadoPago: EstadoPago;
  saldoPendiente: number;
  detalles: DetalleVenta[];
}

export interface DetalleVentaCreateDto {
  productoId: number;
  cantidadCajones: number;
  precioUnitario: number;
}

export interface VentaCreateDto {
  clienteId?: number | null;
  usuarioId: number;
  estadoPago: EstadoPago;
  detalles: DetalleVentaCreateDto[];
}

export const obtenerVentas = async (): Promise<Venta[]> => {
  const response = await api.get("/Venta");
  return response.data;
};

export const obtenerVentaPorId = async (
  id: number
): Promise<Venta> => {
  const response = await api.get(`/Venta/${id}`);
  return response.data;
};

export const crearVenta = async (
  venta: VentaCreateDto
): Promise<Venta> => {
  const response = await api.post("/Venta", venta);
  return response.data;
};

export const cancelarVenta = async (
  id: number
): Promise<void> => {
  await api.delete(`/Venta/${id}`);
};