import { useEffect, useState } from "react";
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
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import MovimientoProveedorCard from "./components/MovimientoProveedorCard";
import MovimientoProveedorDialog from "./components/MovimientoProveedorDialog";

import {
  obtenerProveedorPorId,
  obtenerDeudasProveedor,
  obtenerPagosProveedor,
  registrarDeudaProveedor,
  registrarPagoProveedor,
  type Proveedor,
} from "../../services/proveedorService";

interface MovimientoProveedor {
  id: number;
  tipo: "deuda" | "pago";
  fecha: string;
  monto: number;
  descripcion: string;
}

function ProveedorDetallePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [proveedor, setProveedor] = useState<Proveedor | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);

  const [movimientos, setMovimientos] = useState<MovimientoProveedor[]>([]);
  const [cargandoMovimientos, setCargandoMovimientos] = useState(true);

  const [dialogoMovimiento, setDialogoMovimiento] = useState<
    "deuda" | "pago" | null
  >(null);

  const [guardandoMovimiento, setGuardandoMovimiento] =
    useState(false);

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

        const data =
          await obtenerProveedorPorId(proveedorId);

        setProveedor(data);
      } catch (error) {
        console.error(
          "Error al cargar proveedor:",
          error
        );

        setErrorCarga(true);
      } finally {
        setCargando(false);
      }
    };

    cargarProveedor();
  }, [id]);
  const cargarMovimientos = async () => {
    const proveedorId = Number(id);

      if (!proveedorId) {
        return;
      }

      try {
        setCargandoMovimientos(true);

        const [deudas, pagos] = await Promise.all([
          obtenerDeudasProveedor(proveedorId),
          obtenerPagosProveedor(proveedorId),
        ]);

        const movimientosDeuda: MovimientoProveedor[] = deudas.map(
          (deuda) => ({
            id: deuda.id,
            tipo: "deuda",
            fecha: new Date(deuda.fecha).toLocaleDateString("es-AR"),
            monto: deuda.monto,
            descripcion:
              deuda.observaciones || "Deuda registrada",
          })
        );

        const movimientosPago: MovimientoProveedor[] = pagos.map(
          (pago) => ({
            id: pago.id,
            tipo: "pago",
            fecha: new Date(pago.fecha).toLocaleDateString("es-AR"),
            monto: pago.monto,
            descripcion:
              pago.observaciones || "Pago registrado",
          })
        );

        const movimientosOrdenados = [
          ...movimientosDeuda,
          ...movimientosPago,
        ].sort((a, b) => {
          const fechaA = new Date(
            a.fecha.split("/").reverse().join("-")
          ).getTime();

          const fechaB = new Date(
            b.fecha.split("/").reverse().join("-")
          ).getTime();

          return fechaB - fechaA;
        });

        setMovimientos(movimientosOrdenados);
      } catch (error) {
        console.error(
          "Error al cargar movimientos del proveedor:",
          error
        );
      } finally {
        setCargandoMovimientos(false);
      }
  };

  useEffect(() => {
    cargarMovimientos();
  }, [id]);

  const handleGuardarMovimiento = async (data: {
    monto: number;
    observaciones: string;
  }) => {
    if (!dialogoMovimiento || !proveedor) {
      return;
    }

    try {
      setGuardandoMovimiento(true);

      if (dialogoMovimiento === "deuda") {
        await registrarDeudaProveedor(proveedor.id, {
          monto: data.monto,
          observaciones: data.observaciones || null,
        });

        setProveedor((proveedorActual) =>
          proveedorActual
            ? {
                ...proveedorActual,
                saldoPendiente:
                  proveedorActual.saldoPendiente + data.monto,
              }
            : proveedorActual
        );
      } else {
        await registrarPagoProveedor({
          proveedorId: proveedor.id,
          monto: data.monto,
          observaciones: data.observaciones || null,
        });

        setProveedor((proveedorActual) =>
          proveedorActual
            ? {
                ...proveedorActual,
                saldoPendiente:
                  proveedorActual.saldoPendiente - data.monto,
              }
            : proveedorActual
        );
      }

      await cargarMovimientos();

      setDialogoMovimiento(null);
    } catch (error) {
      console.error("Error al registrar movimiento:", error);

      alert(
        dialogoMovimiento === "deuda"
          ? "No se pudo registrar la deuda."
          : "No se pudo registrar el pago."
      );
    } finally {
      setGuardandoMovimiento(false);
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

  const iniciales = proveedor.nombre
    .split(" ")
    .filter(Boolean)
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const saldoFormateado =
    proveedor.saldoPendiente.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

  const tieneDeuda = proveedor.saldoPendiente > 0;

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
          onClick={() => navigate("/proveedores")}
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
                {proveedor.nombre}
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
                    color: "text.secondary",                    }}
                  />

                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                  }}
                >
                  {proveedor.telefono}
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
            Saldo pendiente
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
          disabled={!tieneDeuda}
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

      {/* Historial de movimientos */}
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
          {cargandoMovimientos ? (
            <Typography
              sx={{
                fontSize: "0.82rem",
                color: "text.secondary",
              }}
            >
              Cargando movimientos...
            </Typography>
          ) : movimientos.length === 0 ? (
            <Typography
              sx={{
                fontSize: "0.82rem",
                color: "text.secondary",
              }}
            >
              Todavía no hay movimientos registrados.
            </Typography>
          ) : (
            movimientos.map((movimiento) => (
              <MovimientoProveedorCard
                key={`${movimiento.tipo}-${movimiento.id}`}
                tipo={movimiento.tipo}
                fecha={movimiento.fecha}
                monto={movimiento.monto}
                descripcion={movimiento.descripcion}
              />
            ))
          )}
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