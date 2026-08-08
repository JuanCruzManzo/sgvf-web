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
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MovimientoClienteCard from "./components/MovimientoClienteCard";
import MovimientoClienteDialog from "./components/MovimientoClienteDialog";

import {
  obtenerClientePorId,
  type Cliente,
} from "../../services/clienteService";

import {
  obtenerPagosPorCliente,
  registrarCobro,
  registrarDeuda,
  type PagoCliente,
} from "../../services/pagoClienteService";

function ClienteDetallePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [movimientos, setMovimientos] = useState<PagoCliente[]>([]);

  const [cargando, setCargando] = useState(true);

  const [dialogoMovimiento, setDialogoMovimiento] = useState<
    "deuda" | "cobro" | null
  >(null);

  const [guardandoMovimiento, setGuardandoMovimiento] = useState(false);

  // =========================
  // Cargar cliente y movimientos
  // =========================

  const cargarDatos = async () => {
    if (!id) return;

    try {
      const clienteId = Number(id);

      const [clienteData, movimientosData] = await Promise.all([
        obtenerClientePorId(clienteId),
        obtenerPagosPorCliente(clienteId),
      ]);

      setCliente(clienteData);
      setMovimientos(movimientosData);
    } catch (error) {
      console.error(
        "Error obteniendo datos del cliente:",
        error
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [id]);

  // =========================
  // Registrar deuda / cobro
  // =========================

  const handleGuardarMovimiento = async (data: {
    monto: number;
    fecha: string;
    observaciones: string;
  }) => {
    if (!cliente || !dialogoMovimiento) {
      return;
    }

    try {
      setGuardandoMovimiento(true);

      const datos = {
        clienteId: cliente.id,
        monto: data.monto,
        observaciones: data.observaciones || undefined,
      };

      if (dialogoMovimiento === "deuda") {
        await registrarDeuda(datos);
      } else {
        await registrarCobro(datos);
      }

      // Volvemos a consultar el cliente.
      // Esto actualiza el saldo real desde el backend.
      await cargarDatos();

      // Cerramos el diálogo.
      setDialogoMovimiento(null);
    } catch (error: any) {
      console.error(
        "Error registrando movimiento:",
        error
      );

      const mensaje =
        error?.response?.data?.mensaje ||
        "No se pudo registrar el movimiento.";

      alert(mensaje);
    } finally {
      setGuardandoMovimiento(false);
    }
  };

  // =========================
  // Estados de carga
  // =========================

  if (cargando) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography>
          Cargando cliente...
        </Typography>
      </Box>
    );
  }

  if (!cliente) {
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
          Cliente no encontrado
        </Typography>
      </Box>
    );
  }

  // =========================
  // Datos visuales
  // =========================

  const iniciales = cliente.nombre
    .split(" ")
    .filter(Boolean)
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const saldoFormateado =
    cliente.saldoPendiente.toLocaleString(
      "es-AR",
      {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }
    );

  const tieneDeuda =
    cliente.saldoPendiente > 0;

  // =========================
  // Render
  // =========================

  return (
    <Box sx={{ pb: 10 }}>

      {/* ENCABEZADO */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Button
          onClick={() => navigate("/clientes")}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0,
            borderRadius: "10px",
            border: "1px solid #DDDDDD",
            backgroundColor: "#FFFFFF",
            color: "#333333",
          }}
        >
          <ArrowBackRounded />
        </Button>

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

      {/* INFORMACIÓN DEL CLIENTE */}

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
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            >
              {iniciales}
            </Avatar>

            <Box>
              <Typography
                sx={{
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
                  gap: 0.5,
                }}
              >
                <PhoneOutlined
                  sx={{
                    fontSize: 16,
                    color: "text.secondary",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                  }}
                >
                  {cliente.telefono}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

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
              fontSize: "1.6rem",
              fontWeight: 800,
              color: tieneDeuda
                ? "#D32F2F"
                : "#2E7D32",
            }}
          >
            {tieneDeuda
              ? saldoFormateado
              : "Sin deuda"}
          </Typography>
        </CardContent>
      </Card>

      {/* ACCIONES */}

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
          startIcon={
            <ReceiptLongOutlined />
          }
          onClick={() =>
            setDialogoMovimiento("deuda")
          }
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
          startIcon={
            <PaymentsOutlined />
          }
          onClick={() =>
            setDialogoMovimiento("cobro")
          }
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

      {/* HISTORIAL */}

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
          Historial de movimientos del cliente.
        </Typography>

        {movimientos.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {movimientos.map((movimiento) => (
              <MovimientoClienteCard
                key={movimiento.id}
                tipo="cobro"
                fecha={movimiento.fecha}
                monto={movimiento.monto}
                descripcion={
                  movimiento.observaciones ||
                  "Movimiento de cuenta"
                }
              />
            ))}
          </Box>
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

      {/* DIÁLOGO */}

      <MovimientoClienteDialog
        open={
          dialogoMovimiento !== null
        }
        tipo={
          dialogoMovimiento ?? "deuda"
        }
        loading={
          guardandoMovimiento
        }
        onClose={() => {
          if (!guardandoMovimiento) {
            setDialogoMovimiento(null);
          }
        }}
        onSubmit={
          handleGuardarMovimiento
        }
      />

    </Box>
  );
}

export default ClienteDetallePage;