const API_URL = "http://localhost:5289/api";

export async function login(
  nombreUsuario: string,
  password: string
): Promise<string> {

  const response = await fetch(
    `${API_URL}/Auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreUsuario: nombreUsuario,
        password: password,
      }),
    }
  );


  if (!response.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }


  const token = await response.text();

  localStorage.setItem("token", token);

  return token;
}