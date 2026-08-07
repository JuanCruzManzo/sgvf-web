import api from "./api";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
  activo: boolean;
}

export interface ProductoCreate {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

export interface ProductoUpdate {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
  activo: boolean;
}

export const obtenerProductos = async (): Promise<Producto[]> => {
  const response = await api.get<Producto[]>("/Producto");

  return response.data;
};

export const obtenerProductoPorId = async (
  id: number
): Promise<Producto> => {
  const response = await api.get<Producto>(`/Producto/${id}`);

  return response.data;
};

export const crearProducto = async (
  producto: ProductoCreate
): Promise<Producto> => {
  const response = await api.post<Producto>(
    "/Producto",
    producto
  );

  return response.data;
};

export const actualizarProducto = async (
  id: number,
  producto: ProductoUpdate
): Promise<void> => {
  await api.put(`/Producto/${id}`, producto);
};

export const eliminarProducto = async (
  id: number
): Promise<void> => {
  await api.delete(`/Producto/${id}`);
};