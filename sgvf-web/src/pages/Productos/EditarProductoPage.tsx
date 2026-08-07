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

import ProductoForm from "./components/ProductoForm";

import {
  actualizarProducto,
  obtenerProductoPorId,
  type Producto,
} from "../../services/productoService";

interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

function EditarProductoPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState<Producto | null>(null);

  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarProducto = async () => {
      const productoId = Number(id);

      if (!productoId) {
        setErrorCarga(true);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setErrorCarga(false);

        const data = await obtenerProductoPorId(productoId);

        setProducto(data);
      } catch (error) {
        console.error("Error al cargar producto:", error);
        setErrorCarga(true);
      } finally {
        setCargando(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleGuardarCambios = async (
    values: ProductoFormValues
  ) => {
    if (!producto) {
      return;
    }

    try {
      setGuardando(true);

      await actualizarProducto(producto.id, {
        nombre: values.nombre,
        descripcion: values.descripcion,
        stock: values.stock,
        stockMinimo: values.stockMinimo,
        activo: producto.activo,
      });

      navigate("/productos", {
        replace: true,
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error);

      alert("No se pudo actualizar el producto.");
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
          Cargando producto...
        </Typography>
      </Box>
    );
  }

  if (errorCarga || !producto) {
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
          No pudimos cargar el producto
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: "0.85rem",
            color: "text.secondary",
          }}
        >
          Verificá que el producto exista e intentá nuevamente.
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