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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClienteForm from "./components/ClienteForm";
import {
  actualizarCliente,
  obtenerClientePorId,
} from "../../services/clienteService";

interface ClienteFormValues {
  nombre: string;
  telefono: string;
}

function EditarClientePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState<ClienteFormValues | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarCliente = async () => {
      try {
        if (!id) return;

        const data = await obtenerClientePorId(Number(id));

        setCliente({
          nombre: data.nombre,
          telefono: data.telefono,
        });

      } catch (error) {
        console.error("Error obteniendo cliente:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarCliente();
  }, [id]);


  const handleGuardarCambios = async (
    values: ClienteFormValues
  ) => {
    try {
      setGuardando(true);

      await actualizarCliente(
        Number(id),
        {
          nombre: values.nombre,
          telefono: values.telefono,
        }
      );

      navigate("/clientes", {
        replace: true,
      });

    } catch (error) {
      console.error("Error actualizando cliente:", error);
    } finally {
      setGuardando(false);
    }
  };


  if (cargando) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography>
          Cargando cliente...
        </Typography>
      </Box>
    );
  }


  if (!cliente) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography sx={{ fontWeight: 700 }}>
          Cliente no encontrado
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
          onClick={() => navigate("/clientes")}
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
            Editar cliente
          </Typography>

          <Typography
            sx={{
              mt: 0.15,
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            Modificá los datos del cliente.
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
                Datos del cliente
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


          <ClienteForm
            initialValues={{
              nombre: cliente.nombre,
              telefono: cliente.telefono,
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

export default EditarClientePage;