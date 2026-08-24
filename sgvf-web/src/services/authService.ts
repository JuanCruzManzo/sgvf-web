import api from "./api";

interface LoginResponse {
  token: string;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
}

export async function login(
  nombreUsuario: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/Auth/login", {
    nombreUsuario,
    password,
  });

  const data = response.data;

  localStorage.setItem("token", data.token);
  localStorage.setItem("nombre", data.nombre);
  localStorage.setItem("apellido", data.apellido);
  localStorage.setItem("nombreUsuario", data.nombreUsuario);

  return data;
}