import {
  ArrowBackRounded,
  LocalShippingOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProveedorForm from "./components/ProveedorForm";
import { crearProveedor } from "../../services/proveedorService";

interface ProveedorFormValues {
  nombre: string;
  telefono: string;
}

function NuevoProveedorPage() {
  const navigate = useNavigate();
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async (
    values: ProveedorFormValues
  ) => {
    try {
      setGuardando(true);

      await crearProveedor({
        nombre: values.nombre,
        telefono: values.telefono,
      });

      navigate("/proveedores");
    } catch (error) {
      console.error("Error al crear proveedor:", error);

      alert("No se pudo crear el proveedor.");
    } finally {
      setGuardando(false);
    }
  };
  return (
    <Box sx={{ pb: 10 }}>
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.25,
          mb: 2,
        }}
      >
        <IconButton
          aria-label="Volver"
          onClick={() => navigate("/proveedores")}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            border: "1px solid #DDDDDD",
            backgroundColor: "#FFFFFF",
            color: "#333333",
            flexShrink: 0,
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          <ArrowBackRounded />
        </IconButton>

        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            Nuevo proveedor
          </Typography>

          <Typography
            sx={{
              mt: 0.15,
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            Completá los datos para registrar un proveedor.
          </Typography>
        </Box>
      </Box>

      {/* Formulario */}
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #DDDDDD",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
        }}
      >
        <CardContent
          sx={{
            p: 2,
            "&:last-child": {
              pb: 2,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                backgroundColor: "#E8F5E9",
                color: "#2E7D32",
              }}
            >
              <LocalShippingOutlined />
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#333333",
                }}
              >
                Datos del proveedor
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.77rem",
                  color: "text.secondary",
                }}
              >
                El nombre y el teléfono son obligatorios.
              </Typography>
            </Box>
          </Box>

          <ProveedorForm
            submitLabel="Guardar proveedor"
            onSubmit={handleGuardar}
            loading={guardando}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default NuevoProveedorPage;