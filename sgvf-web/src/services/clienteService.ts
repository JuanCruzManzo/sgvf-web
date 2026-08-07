import api from "./api";

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  saldoPendiente: number;
  fechaUltimoCobro?: string;
  montoUltimoCobro?: number;
  activo: boolean;
}

export interface ClienteCreateDto {
  nombre: string;
  telefono: string;
}

export interface ClienteUpdateDto {
  nombre: string;
  telefono: string;
}


export const obtenerClientes = async (): Promise<Cliente[]> => {
  const response = await api.get("/Cliente");
  return response.data;
};


export const obtenerClientePorId = async (
  id: number
): Promise<Cliente> => {
  const response = await api.get(`/Cliente/${id}`);
  return response.data;
};


export const crearCliente = async (
  cliente: ClienteCreateDto
): Promise<Cliente> => {
  const response = await api.post("/Cliente", cliente);
  return response.data;
};


export const actualizarCliente = async (
  id: number,
  cliente: ClienteUpdateDto
): Promise<void> => {
  await api.put(`/Cliente/${id}`, cliente);
};


export const eliminarCliente = async (
  id: number
): Promise<void> => {
  await api.delete(`/Cliente/${id}`);
};