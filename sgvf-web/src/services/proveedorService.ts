import api from "./api";

export interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  saldoPendiente: number;
  fechaUltimoPago: string | null;
  montoUltimoPago: number | null;
  activo: boolean;
}

export interface ProveedorCreate {
  nombre: string;
  telefono?: string | null;
}

export interface ProveedorUpdate {
  nombre: string;
  telefono?: string | null;
}

export interface DeudaProveedorCreate {
  monto: number;
  observaciones?: string | null;
}

export interface DeudaProveedor {
  id: number;
  proveedorId: number;
  proveedor: string;
  fecha: string;
  monto: number;
  observaciones: string | null;
}

export interface PagoProveedorCreate {
  proveedorId: number;
  monto: number;
  observaciones?: string | null;
}

export interface PagoProveedor {
  id: number;
  proveedorId: number;
  proveedor: string;
  fecha: string;
  monto: number;
  observaciones: string | null;
}

export const obtenerProveedores = async (): Promise<Proveedor[]> => {
  const response = await api.get<Proveedor[]>("/Proveedor");
  return response.data;
};

export const obtenerProveedorPorId = async (
  id: number
): Promise<Proveedor> => {
  const response = await api.get<Proveedor>(`/Proveedor/${id}`);
  return response.data;
};

export const crearProveedor = async (
  proveedor: ProveedorCreate
): Promise<Proveedor> => {
  const response = await api.post<Proveedor>(
    "/Proveedor",
    proveedor
  );

  return response.data;
};

export const actualizarProveedor = async (
  id: number,
  proveedor: ProveedorUpdate
): Promise<void> => {
  await api.put(`/Proveedor/${id}`, proveedor);
};

export const eliminarProveedor = async (
  id: number
): Promise<void> => {
  await api.delete(`/Proveedor/${id}`);
};

export const registrarDeudaProveedor = async (
  proveedorId: number,
  deuda: DeudaProveedorCreate
): Promise<DeudaProveedor> => {
  const response = await api.post<DeudaProveedor>(
    `/Proveedor/${proveedorId}/deuda`,
    deuda
  );

  return response.data;
};

export const registrarPagoProveedor = async (
  pago: PagoProveedorCreate
): Promise<PagoProveedor> => {
  const response = await api.post<PagoProveedor>(
    "/PagoProveedor",
    pago
  );

  return response.data;
};

export const obtenerDeudasProveedor = async (
  proveedorId: number
): Promise<DeudaProveedor[]> => {
  const response = await api.get<DeudaProveedor[]>(
    `/Proveedor/${proveedorId}/deudas`
  );

  return response.data;
};

export const obtenerPagosProveedor = async (
  proveedorId: number
): Promise<PagoProveedor[]> => {
  const response = await api.get<PagoProveedor[]>(
    `/PagoProveedor/proveedor/${proveedorId}`
  );

  return response.data;
};