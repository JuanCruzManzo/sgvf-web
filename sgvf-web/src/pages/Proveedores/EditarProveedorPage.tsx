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
import ProveedorForm from "./components/ProveedorForm";

interface ProveedorFormValues {
  nombre: string;
  telefono: string;
}

const proveedoresSimulados = [
  {
    id: 1,
    nombre: "Distribuidora Norte",
    telefono: "223 555-1234",
  },
  {
    id: 2,
    nombre: "Mercado Central",
    telefono: "223 444-5678",
  },
  {
    id: 3,
    nombre: "Frutas del Sur",
    telefono: "223 333-9012",
  },
];

function EditarProveedorPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [guardando, setGuardando] = useState(false);

  const proveedor = proveedoresSimulados.find(
    (item) => item.id === Number(id)
  );

  if (!proveedor) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography sx={{ fontWeight: 700 }}>
          Proveedor no encontrado
        </Typography>
      </Box>
    );
  }

  const handleGuardarCambios = (
    values: ProveedorFormValues
  ) => {
    setGuardando(true);

    // Más adelante se reemplaza por el PUT o PATCH a la API.
    console.log("Proveedor editado:", {
      id: proveedor.id,
      ...values,
    });

    setTimeout(() => {
    setGuardando(false);

    navigate(`/proveedores/${proveedor.id}`, {
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
            Editar proveedor
          </Typography>

          <Typography
            sx={{
              mt: 0.15,
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            Modificá los datos del proveedor.
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
                Datos del proveedor
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.77rem",
                  color: "text.secondary",
                }}
              >
                Actualizá el nombre o el teléfono.
              </Typography>
            </Box>
          </Box>

          <ProveedorForm
            initialValues={{
              nombre: proveedor.nombre,
              telefono: proveedor.telefono,
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

export default EditarProveedorPage;