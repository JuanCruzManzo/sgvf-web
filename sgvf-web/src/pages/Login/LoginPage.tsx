import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { Link } from "@mui/material";

/**
 * Pantalla visual de acceso al sistema.
 *
 * En esta primera versión, el formulario no consume todavía la API.
 * Al enviarse correctamente, redirige al Dashboard para permitir
 * la demostración del flujo general de la aplicación.
 */
function LoginPage() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [errores, setErrores] = useState({
    usuario: "",
    contrasena: "",
  });

  /**
   * Valida que ambos campos estén completos.
   * Si la validación es correcta, simula el inicio de sesión.
   */
  const manejarIngreso = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevosErrores = {
      usuario: usuario.trim() ? "" : "Ingresá tu usuario.",
      contrasena: contrasena.trim() ? "" : "Ingresá tu contraseña.",
    };

    setErrores(nuevosErrores);

    const formularioValido =
      !nuevosErrores.usuario && !nuevosErrores.contrasena;

    if (formularioValido) {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #E8F5E9 0%, #F8F9FA 45%, #F8F9FA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 0,
      }}
    >
      <Paper
        component="main"
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: "24px",
          border: "1px solid #E7E7E7",
          backgroundColor: "#FFFFFF",
          p: {
            xs: 3,
            sm: 4,
          },
        }}
      >
        <Box
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 2,
              borderRadius: "22px",
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AgricultureRoundedIcon sx={{ fontSize: 40 }} />
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#2E7D32",
            }}
          >
            Sistema de Gestión
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "text.secondary",
              fontSize: "1rem",
            }}
          >
            Frutihortícola
          </Typography>
        </Box>

        <Box component="form" onSubmit={manejarIngreso} noValidate>
          <TextField
            fullWidth
            label="Usuario"
            value={usuario}
            onChange={(event) => {
              setUsuario(event.target.value);

              if (errores.usuario) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  usuario: "",
                }));
              }
            }}
            error={Boolean(errores.usuario)}
            helperText={errores.usuario}
            autoComplete="username"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Contraseña"
            type={mostrarContrasena ? "text" : "password"}
            value={contrasena}
            onChange={(event) => {
              setContrasena(event.target.value);

              if (errores.contrasena) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  contrasena: "",
                }));
              }
            }}
            error={Boolean(errores.contrasena)}
            helperText={errores.contrasena}
            autoComplete="current-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      aria-label={
                        mostrarContrasena
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      onClick={() =>
                        setMostrarContrasena((estadoAnterior) => !estadoAnterior)
                      }
                      edge="end"
                    >
                      {mostrarContrasena ? (
                        <VisibilityOffRoundedIcon />
                      ) : (
                        <VisibilityRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 3 }}
          />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3,
                }}
                >
                <Link
                    component="button"
                    type="button"
                    underline="hover"
                    sx={{
                    color: "#2E7D32",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    textDecoration: "none",
                    cursor: "pointer",

                    "&:hover": {
                        color: "#256628",
                    },
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              minHeight: 52,
              borderRadius: "14px",
              backgroundColor: "#2E7D32",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#256628",
                boxShadow: "none",
              },
            }}
          >
            Ingresar
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "text.disabled",
            fontSize: "0.78rem",
          }}
        >
          © 2026 SGVF
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;