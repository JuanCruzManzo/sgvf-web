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

export const obtenerClientes = async (): Promise<Cliente[]> => {
  const response = await api.get("/Cliente");
  return response.data;
};