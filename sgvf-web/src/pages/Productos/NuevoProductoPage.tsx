import {
  ArrowBackRounded,
  Inventory2Outlined,
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
import ProductoForm from "./components/ProductoForm";

interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

function NuevoProductoPage() {
  const navigate = useNavigate();
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = (values: ProductoFormValues) => {
    setGuardando(true);

    // Más adelante se reemplaza por el POST a la API.
    console.log("Nuevo producto:", values);

    setTimeout(() => {
      setGuardando(false);
      navigate("/productos");
    }, 600);
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
          onClick={() => navigate("/productos")}
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
            Nuevo producto
          </Typography>

          <Typography
            sx={{
              mt: 0.15,
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            Completá los datos para registrar un producto.
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
              <Inventory2Outlined />
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#333333",
                }}
              >
                Datos del producto
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.77rem",
                  color: "text.secondary",
                }}
              >
                Completá la información de stock del producto.
              </Typography>
            </Box>
          </Box>

          <ProductoForm
            submitLabel="Guardar producto"
            onSubmit={handleGuardar}
            loading={guardando}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default NuevoProductoPage;