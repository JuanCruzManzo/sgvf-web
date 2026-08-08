import api from "./api";

export interface PagoCliente {
  id: number;
  clienteId: number;
  cliente: string;
  fecha: string;
  monto: number;
  observaciones?: string;
}

export interface PagoClienteCreateDto {
  clienteId: number;
  monto: number;
  observaciones?: string;
}

// Obtener todos los movimientos
export const obtenerPagosCliente = async (): Promise<PagoCliente[]> => {
  const response = await api.get("/PagoCliente");
  return response.data;
};

// Obtener un movimiento por ID
export const obtenerPagoClientePorId = async (
  id: number
): Promise<PagoCliente> => {
  const response = await api.get(`/PagoCliente/${id}`);
  return response.data;
};

// Obtener movimientos de un cliente
export const obtenerPagosPorCliente = async (
  clienteId: number
): Promise<PagoCliente[]> => {
  const response = await api.get(
    `/PagoCliente/cliente/${clienteId}`
  );

  return response.data;
};

// Registrar un cobro
export const registrarCobro = async (
  data: PagoClienteCreateDto
): Promise<PagoCliente> => {
  const response = await api.post(
    "/PagoCliente",
    data
  );

  return response.data;
};

// Registrar una deuda
export const registrarDeuda = async (
  data: PagoClienteCreateDto
): Promise<PagoCliente> => {
  const response = await api.post(
    "/PagoCliente/deuda",
    data
  );

  return response.data;
};

// Eliminar un movimiento
export const eliminarPagoCliente = async (
  id: number
): Promise<void> => {
  await api.delete(`/PagoCliente/${id}`);
};