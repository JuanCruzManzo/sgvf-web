import {
  ArrowBackRounded,
  PaymentsOutlined,
  PhoneOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MovimientoClienteCard from "./components/MovimientoClienteCard";
import MovimientoClienteDialog from "./components/MovimientoClienteDialog";

interface MovimientoCliente {
  id: number;
  clienteId: number;
  tipo: "deuda" | "cobro";
  fecha: string;
  monto: number;
  descripcion: string;
}

const clientesSimulados = [
  {
    id: 1,
    nombre: "Juan Pérez",
    telefono: "223 555-1234",
    saldoPendiente: 45000,
  },
  {
    id: 2,
    nombre: "María Gómez",
    telefono: "223 444-5678",
    saldoPendiente: 0,
  },
  {
    id: 3,
    nombre: "Carlos Fernández",
    telefono: "223 333-9012",
    saldoPendiente: 28500,
  },
];

const movimientosSimulados: MovimientoCliente[] = [
  {
    id: 1,
    clienteId: 1,
    tipo: "deuda",
    fecha: "29/07/2026",
    monto: 60000,
    descripcion: "Venta fiada",
  },
  {
    id: 2,
    clienteId: 1,
    tipo: "cobro",
    fecha: "28/07/2026",
    monto: 15000,
    descripcion: "Cobro en efectivo",
  },
  {
    id: 3,
    clienteId: 2,
    tipo: "cobro",
    fecha: "25/07/2026",
    monto: 30000,
    descripcion: "Cobro de deuda",
  },
  {
    id: 4,
    clienteId: 3,
    tipo: "deuda",
    fecha: "27/07/2026",
    monto: 40000,
    descripcion: "Venta de mercadería",
  },
  {
    id: 5,
    clienteId: 3,
    tipo: "cobro",
    fecha: "26/07/2026",
    monto: 11500,
    descripcion: "Cobro parcial",
  },
];

function ClienteDetallePage() {
  const { id } = useParams();

  const cliente = clientesSimulados.find(
    (item) => item.id === Number(id)
  );

  if (!cliente) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography sx={{ fontWeight: 700 }}>
          Cliente no encontrado
        </Typography>
      </Box>
    );
  }

  const movimientosCliente = movimientosSimulados.filter(
    (movimiento) => movimiento.clienteId === cliente.id
  );

  const iniciales = cliente.nombre
    .split(" ")
    .filter(Boolean)
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const saldoFormateado = cliente.saldoPendiente.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const tieneDeuda = cliente.saldoPendiente > 0;

  const [dialogoMovimiento, setDialogoMovimiento] = useState<
  "deuda" | "cobro" | null
  >(null);

  const [guardandoMovimiento, setGuardandoMovimiento] = useState(false);
  
  const handleGuardarMovimiento = (data: {
  monto: number;
  fecha: string;
  observaciones: string;
  }) => {
  if (!dialogoMovimiento) {
    return;
  }

  setGuardandoMovimiento(true);

  // Más adelante se reemplaza por el POST a la API.
  console.log("Nuevo movimiento del cliente:", {
    clienteId: cliente.id,
    tipo: dialogoMovimiento,
    ...data,
  });

  setTimeout(() => {
    setGuardandoMovimiento(false);
    setDialogoMovimiento(null);
  }, 600);
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* Encabezado */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Button
          aria-label="Volver"
          onClick={() => {
            window.history.back();
          }}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0,
            borderRadius: "10px",
            color: "#333333",
            border: "1px solid #DDDDDD",
            backgroundColor: "#FFFFFF",
          }}
        >
          <ArrowBackRounded />
        </Button>

        <Box>
          <Typography
            component="h1"
            sx={{
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            Detalle del cliente
          </Typography>
        </Box>
      </Box>

      {/* Información del cliente */}
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
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#4CAF50",
                color: "success.dark",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              {iniciales}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                noWrap
                sx={{
                    gridColumn: 2,
                    gridRow: 1,
                    justifySelf: "start",
                    width: "100%",
                    textAlign: "left",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: "#333333",
                }}
              >
                {cliente.nombre}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  mt: 0.35,
                }}
              >
                <PhoneOutlined
                  sx={{
                    fontSize: "0.95rem",
                    color: "text.secondary",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.82rem",
                    color: "text.secondary",
                  }}
                >
                  {cliente.telefono}
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Divider sx={{ my: 1.75 }} />

          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "text.secondary",
            }}
          >
            Deuda del cliente
          </Typography>

          <Typography
            sx={{
              mt: 0.2,
              fontSize: "1.65rem",
              fontWeight: 800,
              color: tieneDeuda ? "#D32F2F" : "#2E7D32",
            }}
          >
            {tieneDeuda ? saldoFormateado : "Sin deuda"}
          </Typography>
        </CardContent>
      </Card>

      {/* Acciones */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.25,
          mt: 1.5,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ReceiptLongOutlined />}
          onClick={() => {
            setDialogoMovimiento("deuda");
          }}
          sx={{
            minHeight: 46,
            borderRadius: "12px",
            borderColor: "#EF9A9A",
            color: "#D32F2F",
            fontWeight: 700,
            textTransform: "none",
            backgroundColor: "#FFF8F8",
            "&:hover": {
              borderColor: "#E57373",
              backgroundColor: "#FFEBEE",
            },
          }}
        >
          Registrar deuda
        </Button>

        <Button
          variant="outlined"
          startIcon={<PaymentsOutlined />}
          onClick={() => {
            setDialogoMovimiento("cobro");
          }}
          sx={{
            minHeight: 46,
            borderRadius: "12px",
            borderColor: "#81C784",
            color: "#2E7D32",
            fontWeight: 700,
            textTransform: "none",
            backgroundColor: "#F6FBF6",
            "&:hover": {
              borderColor: "#66BB6A",
              backgroundColor: "#E8F5E9",
            },
          }}
        >
          Registrar cobro
        </Button>
      </Box>

      {/* Historial */}
      <Box sx={{ mt: 2.25 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Movimientos recientes
        </Typography>

        <Typography
          sx={{
            mt: 0.2,
            mb: 1.25,
            fontSize: "0.8rem",
            color: "text.secondary",
          }}
        >
          Historial de deudas y cobros del cliente.
        </Typography>

        {movimientosCliente.length > 0 ? (
          <Stack spacing={1}>
            {movimientosCliente.map((movimiento) => (
              <MovimientoClienteCard
                key={movimiento.id}
                tipo={movimiento.tipo}
                fecha={movimiento.fecha}
                monto={movimiento.monto}
                descripcion={movimiento.descripcion}
              />
            ))}
          </Stack>
        ) : (
          <Card
            elevation={0}
            sx={{
              borderRadius: "14px",
              border: "1px solid #DDDDDD",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardContent
              sx={{
                py: 3,
                textAlign: "center",
                "&:last-child": {
                  pb: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                }}
              >
                No hay movimientos registrados
              </Typography>

              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: "0.78rem",
                  color: "text.secondary",
                }}
              >
                Las deudas y los cobros aparecerán acá.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
      <MovimientoClienteDialog
        open={dialogoMovimiento !== null}
        tipo={dialogoMovimiento ?? "deuda"}
        loading={guardandoMovimiento}
        onClose={() => {
          if (!guardandoMovimiento) {
            setDialogoMovimiento(null);
          }
        }}
        onSubmit={handleGuardarMovimiento}
      />
    </Box>
  );
}

export default ClienteDetallePage;