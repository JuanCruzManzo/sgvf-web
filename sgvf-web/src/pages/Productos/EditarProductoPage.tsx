import {
  ArrowBackRounded,
  EditOutlined,
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
import { useNavigate, useParams } from "react-router-dom";
import ProductoForm from "./components/ProductoForm";

interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

const productosSimulados = [
  {
    id: 1,
    nombre: "Tomate redondo",
    descripcion: "Cajón de tomate de primera",
    stock: 28,
    stockMinimo: 5,
  },
  {
    id: 2,
    nombre: "Papa",
    descripcion: "Cajón de papa blanca",
    stock: 15,
    stockMinimo: 5,
  },
  {
    id: 3,
    nombre: "Lechuga de manteca",
    descripcion: "Cajón de lechuga fresca",
    stock: 4,
    stockMinimo: 6,
  },
  {
    id: 4,
    nombre: "Morrón colorado",
    descripcion: "Cajón de morrón",
    stock: 0,
    stockMinimo: 4,
  },
  {
    id: 5,
    nombre: "Zapallito redondo",
    descripcion: "Cajón de zapallito",
    stock: 12,
    stockMinimo: 5,
  },
];

function EditarProductoPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [guardando, setGuardando] = useState(false);

  const producto = productosSimulados.find(
    (item) => item.id === Number(id)
  );

  if (!producto) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography sx={{ fontWeight: 700 }}>
          Producto no encontrado
        </Typography>
      </Box>
    );
  }

  const handleGuardarCambios = (
    values: ProductoFormValues
  ) => {
    setGuardando(true);

    // Más adelante se reemplaza por el PUT a la API.
    console.log("Producto editado:", {
      id: producto.id,
      ...values,
    });

    setTimeout(() => {
      setGuardando(false);

      navigate("/productos", {
        replace: true,
      });
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
            Editar producto
          </Typography>

          <Typography
            sx={{
              mt: 0.15,
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            Modificá los datos y el stock del producto.
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
              <EditOutlined />
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
                Actualizá la información o las cantidades disponibles.
              </Typography>
            </Box>
          </Box>

          <ProductoForm
            initialValues={{
              nombre: producto.nombre,
              descripcion: producto.descripcion,
              stock: producto.stock,
              stockMinimo: producto.stockMinimo,
            }}
            submitLabel="Guardar cambios"
            onSubmit={handleGuardarCambios}
            loading={guardando}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default EditarProductoPage;