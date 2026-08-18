import api from "./api";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
  activo: boolean;
}

export interface ProductoCreateDto {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

export interface ProductoUpdateDto {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
  activo: boolean;
}

export const obtenerProductos = async (): Promise<Producto[]> => {
  const response = await api.get("/Producto");

  return response.data;
};

export const obtenerProductoPorId = async (
  id: number
): Promise<Producto> => {
  const response = await api.get(`/Producto/${id}`);

  return response.data;
};

export const crearProducto = async (
  producto: ProductoCreateDto
): Promise<Producto> => {
  const response = await api.post("/Producto", producto);

  return response.data;
};

export const actualizarProducto = async (
  id: number,
  producto: ProductoUpdateDto
): Promise<void> => {
  await api.put(`/Producto/${id}`, producto);
};

export const eliminarProducto = async (
  id: number
): Promise<void> => {
  await api.delete(`/Producto/${id}`);
};