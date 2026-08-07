import api from "./api";

export async function login(
  nombreUsuario: string,
  password: string
): Promise<string> {

  const response = await api.post("/Auth/login", {
    nombreUsuario,
    password,
  });

  const token = response.data.token;

  localStorage.setItem("token", token);

  return token;
}