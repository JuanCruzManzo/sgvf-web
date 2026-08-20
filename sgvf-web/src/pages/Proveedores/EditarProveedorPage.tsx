import {
  ArrowBackRounded,
  EditOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProveedorForm from "./components/ProveedorForm";

import {
  actualizarProveedor,
  obtenerProveedorPorId,
  type Proveedor,
} from "../../services/proveedorService";

interface ProveedorFormValues {
  nombre: string;
  telefono: string;
}

function EditarProveedorPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [proveedor, setProveedor] = useState<Proveedor | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarProveedor = async () => {
      const proveedorId = Number(id);

      if (!proveedorId) {
        setErrorCarga(true);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setErrorCarga(false);

        const data = await obtenerProveedorPorId(proveedorId);

        setProveedor(data);
      } catch (error) {
        console.error("Error al cargar proveedor:", error);
        setErrorCarga(true);
      } finally {
        setCargando(false);
      }
    };

    cargarProveedor();
  }, [id]);

  const handleGuardarCambios = async (
    values: ProveedorFormValues
  ) => {
    if (!proveedor) {
      return;
    }

    try {
      setGuardando(true);

      await actualizarProveedor(proveedor.id, {
        nombre: values.nombre,
        telefono: values.telefono,
      });

      navigate(`/proveedores/${proveedor.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);

      alert("No se pudo actualizar el proveedor.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <Box
        sx={{
          py: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <CircularProgress
          size={30}
          sx={{
            color: "#2E7D32",
          }}
        />

        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "text.secondary",
          }}
        >
          Cargando proveedor...
        </Typography>
      </Box>
    );
  }

  if (errorCarga || !proveedor) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          No pudimos cargar el proveedor
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: "0.85rem",
            color: "text.secondary",
          }}
        >
          Verificá que el proveedor exista e intentá nuevamente.
        </Typography>
      </Box>
    );
  }

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