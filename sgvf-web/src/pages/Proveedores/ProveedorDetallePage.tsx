import { useState } from "react";
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
import MovimientoProveedorCard from "./components/MovimientoProveedorCard";
import MovimientoProveedorDialog from "./components/MovimientoProveedorDialog";

interface MovimientoProveedor {
  id: number;
  tipo: "deuda" | "pago";
  fecha: string;
  monto: number;
  descripcion: string;
}

const proveedorSimulado = {
  id: 1,
  nombre: "Distribuidora El Sol",
  telefono: "223 555-4182",
  saldoPendiente: 120000,
};

const movimientosSimulados: MovimientoProveedor[] = [
  {
    id: 1,
    tipo: "deuda",
    fecha: "29/07/2026",
    monto: 80000,
    descripcion: "Compra de mercadería",
  },
  {
    id: 2,
    tipo: "pago",
    fecha: "28/07/2026",
    monto: 30000,
    descripcion: "Pago en efectivo",
  },
  {
    id: 3,
    tipo: "deuda",
    fecha: "25/07/2026",
    monto: 70000,
    descripcion: "Compra de cajones",
  },
];

function ProveedorDetallePage() {
  const iniciales = proveedorSimulado.nombre
    .split(" ")
    .filter(Boolean)
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const saldoFormateado = proveedorSimulado.saldoPendiente.toLocaleString(
    "es-AR",
    {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }
  );

  const [dialogoMovimiento, setDialogoMovimiento] = useState<
  "deuda" | "pago" | null
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

    console.log("Nuevo movimiento:", {
      proveedorId: proveedorSimulado.id,
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
            Detalle del proveedor
          </Typography>
        </Box>
      </Box>

      {/* Información del proveedor */}
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
                {proveedorSimulado.nombre}
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
                  {proveedorSimulado.telefono}
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
            Saldo pendiente
          </Typography>

          <Typography
            sx={{
              mt: 0.2,
              fontSize: "1.65rem",
              fontWeight: 800,
              color: "#D32F2F",
            }}
          >
            {saldoFormateado}
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
            setDialogoMovimiento("pago");
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
          Registrar pago
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
          Historial de deudas y pagos del proveedor.
        </Typography>

        <Stack spacing={1}>
          {movimientosSimulados.map((movimiento) => (
            <MovimientoProveedorCard
              key={movimiento.id}
              tipo={movimiento.tipo}
              fecha={movimiento.fecha}
              monto={movimiento.monto}
              descripcion={movimiento.descripcion}
            />
          ))}
        </Stack>
      </Box>
      <MovimientoProveedorDialog
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

export default ProveedorDetallePage;