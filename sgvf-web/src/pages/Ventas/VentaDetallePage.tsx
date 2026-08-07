import {
  ArrowBackRounded,
  CancelOutlined,
  PersonOutlineRounded,
  PointOfSaleOutlined,
  PrintOutlined,
  ReceiptLongOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmDialog from "../../components/ConfirmDialog";

type EstadoPago = "Pagado" | "Pendiente";

interface DetalleVenta {
  id: number;
  productoId: number;
  producto: string;
  cantidadCajones: number;
  precioUnitario: number;
  subtotal: number;
}

interface Venta {
  id: number;
  fecha: string;
  cliente: string;
  usuario: string;
  total: number;
  estadoPago: EstadoPago;
  saldoPendiente: number;
  detalles: DetalleVenta[];
}

const ventasSimuladas: Venta[] = [
  {
    id: 25,
    fecha: "05/08/2026 13:42",
    cliente: "Juan Pérez",
    usuario: "Juan Rodríguez",
    total: 81000,
    estadoPago: "Pagado",
    saldoPendiente: 0,
    detalles: [
      {
        id: 1,
        productoId: 1,
        producto: "Tomate redondo",
        cantidadCajones: 2,
        precioUnitario: 18000,
        subtotal: 36000,
      },
      {
        id: 2,
        productoId: 2,
        producto: "Papa",
        cantidadCajones: 5,
        precioUnitario: 9000,
        subtotal: 45000,
      },
    ],
  },
  {
    id: 24,
    fecha: "05/08/2026 12:18",
    cliente: "Consumidor final",
    usuario: "Juan Rodríguez",
    total: 32000,
    estadoPago: "Pagado",
    saldoPendiente: 0,
    detalles: [
      {
        id: 3,
        productoId: 3,
        producto: "Lechuga de manteca",
        cantidadCajones: 4,
        precioUnitario: 8000,
        subtotal: 32000,
      },
    ],
  },
  {
    id: 23,
    fecha: "05/08/2026 10:35",
    cliente: "María Gómez",
    usuario: "Juan Rodríguez",
    total: 67500,
    estadoPago: "Pagado",
    saldoPendiente: 0,
    detalles: [
      {
        id: 4,
        productoId: 1,
        producto: "Tomate redondo",
        cantidadCajones: 1,
        precioUnitario: 18000,
        subtotal: 18000,
      },
      {
        id: 5,
        productoId: 2,
        producto: "Papa",
        cantidadCajones: 3,
        precioUnitario: 9000,
        subtotal: 27000,
      },
      {
        id: 6,
        productoId: 5,
        producto: "Zapallito redondo",
        cantidadCajones: 3,
        precioUnitario: 7500,
        subtotal: 22500,
      },
    ],
  },
];

function VentaDetallePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [dialogoCancelarAbierto, setDialogoCancelarAbierto] =
    useState(false);

  const [cancelandoVenta, setCancelandoVenta] = useState(false);

  const venta = ventasSimuladas.find(
    (item) => item.id === Number(id)
  );

  if (!venta) {
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
          Venta no encontrada
        </Typography>

        <Button
          onClick={() => navigate("/ventas")}
          sx={{
            mt: 2,
            color: "#2E7D32",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Volver a ventas
        </Button>
      </Box>
    );
  }

  const estaPagada = venta.estadoPago === "Pagado";

  const totalFormateado = venta.total.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const saldoFormateado =
    venta.saldoPendiente.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

  const numeroFormateado = venta.id
    .toString()
    .padStart(4, "0");

  const handleCancelarVenta = () => {
    setCancelandoVenta(true);

    // Más adelante se reemplaza por el endpoint de cancelación.
    console.log("Venta cancelada:", venta.id);

    setTimeout(() => {
      setCancelandoVenta(false);
      setDialogoCancelarAbierto(false);

      navigate("/ventas", {
        replace: true,
      });
    }, 700);
  };

  return (
    <Box sx={{ pb: 10 }}>
      {/* Encabezado */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 40px",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          aria-label="Volver"
          onClick={() => navigate("/ventas")}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0,
            borderRadius: "10px",
            border: "1px solid #DDDDDD",
            backgroundColor: "#FFFFFF",
            color: "#333333",

            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          <ArrowBackRounded />
        </Button>

        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Venta #{numeroFormateado}
        </Typography>

        <Box />
      </Box>

      {/* Información general */}
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
          <Stack spacing={1.5}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    backgroundColor: "#E8F5E9",
                    color: "#2E7D32",
                  }}
                >
                  <PersonOutlineRounded />
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: "0.96rem",
                      fontWeight: 700,
                      color: "#333333",
                    }}
                  >
                    {venta.cliente}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.15,
                      fontSize: "0.76rem",
                      color: "text.secondary",
                    }}
                  >
                    {venta.fecha}
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={venta.estadoPago}
                size="small"
                sx={{
                  flexShrink: 0,
                  backgroundColor: estaPagada
                    ? "#E8F5E9"
                    : "#FFF4E5",
                  color: estaPagada
                    ? "#2E7D32"
                    : "#D97706",
                  fontWeight: 700,
                }}
              />
            </Box>

            <Divider />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: "12px",
                  backgroundColor: "#F8F8F8",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                  }}
                >
                  <StorefrontOutlined
                    sx={{
                      fontSize: "1rem",
                      color: "text.secondary",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "0.73rem",
                      color: "text.secondary",
                    }}
                  >
                    Registrada por
                  </Typography>
                </Box>

                <Typography
                  noWrap
                  sx={{
                    mt: 0.4,
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    color: "#333333",
                  }}
                >
                  {venta.usuario}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.25,
                  borderRadius: "12px",
                  backgroundColor: estaPagada
                    ? "#F6FBF6"
                    : "#FFF8ED",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.7,
                  }}
                >
                  <PointOfSaleOutlined
                    sx={{
                      fontSize: "1rem",
                      color: estaPagada
                        ? "#2E7D32"
                        : "#D97706",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "0.73rem",
                      color: "text.secondary",
                    }}
                  >
                    Saldo pendiente
                  </Typography>
                </Box>

                <Typography
                  noWrap
                  sx={{
                    mt: 0.4,
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    color: estaPagada
                      ? "#2E7D32"
                      : "#D97706",
                  }}
                >
                  {estaPagada ? "Sin saldo" : saldoFormateado}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Productos */}
      <Box sx={{ mt: 2.25 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.25,
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            Productos
          </Typography>

          <Chip
            label={`${venta.detalles.length}`}
            size="small"
            sx={{
              minWidth: 34,
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              fontWeight: 700,
            }}
          />
        </Box>

        <Stack spacing={1}>
          {venta.detalles.map((detalle) => {
            const precioFormateado =
              detalle.precioUnitario.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              });

            const subtotalFormateado =
              detalle.subtotal.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              });

            return (
              <Card
                key={detalle.id}
                elevation={0}
                sx={{
                  borderRadius: "14px",
                  border: "1px solid #DDDDDD",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
                }}
              >
                <CardContent
                  sx={{
                    p: 1.5,
                    "&:last-child": {
                      pb: 1.5,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "40px minmax(0, 1fr) auto",
                      columnGap: 1.25,
                      rowGap: 0.3,
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        gridColumn: 1,
                        gridRow: "1 / span 2",
                        width: 40,
                        height: 40,
                        borderRadius: "11px",
                        backgroundColor: "#E8F5E9",
                        color: "#2E7D32",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ReceiptLongOutlined />
                    </Box>

                    <Typography
                      noWrap
                      sx={{
                        gridColumn: 2,
                        gridRow: 1,
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#333333",
                      }}
                    >
                      {detalle.producto}
                    </Typography>

                    <Typography
                      noWrap
                      sx={{
                        gridColumn: 3,
                        gridRow: "1 / span 2",
                        justifySelf: "end",
                        fontSize: "0.9rem",
                        fontWeight: 800,
                        color: "#2E7D32",
                      }}
                    >
                      {subtotalFormateado}
                    </Typography>

                    <Typography
                      sx={{
                        gridColumn: 2,
                        gridRow: 2,
                        fontSize: "0.76rem",
                        color: "text.secondary",
                      }}
                    >
                      {detalle.cantidadCajones}{" "}
                      {detalle.cantidadCajones === 1
                        ? "cajón"
                        : "cajones"}{" "}
                      · {precioFormateado} c/u
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Box>

      {/* Total */}
      <Card
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: "16px",
          border: "1px solid #C8E6C9",
          backgroundColor: "#F6FBF6",
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
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#555555",
              }}
            >
              Total de la venta
            </Typography>

            <Typography
              sx={{
                fontSize: "1.65rem",
                fontWeight: 800,
                color: "#2E7D32",
              }}
            >
              {totalFormateado}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Reimprimir ticket */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<PrintOutlined />}
        onClick={() => {
          console.log("Reimprimir ticket de la venta:", venta.id);
        }}
        sx={{
          mt: 2,
          minHeight: 48,
          borderRadius: "12px",
          backgroundColor: "#2E7D32",
          color: "#FFFFFF",
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "none",

          "&:hover": {
            backgroundColor: "#256628",
            boxShadow: "none",
          },
        }}
      >
        Imprimir ticket
      </Button>

      {/* Cancelar */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<CancelOutlined />}
        onClick={() => setDialogoCancelarAbierto(true)}
        sx={{
          mt: 1.25,
          minHeight: 48,
          borderRadius: "12px",
          borderColor: "#EF9A9A",
          color: "#D32F2F",
          backgroundColor: "#FFF8F8",
          fontWeight: 700,
          textTransform: "none",

          "&:hover": {
            borderColor: "#E57373",
            backgroundColor: "#FFEBEE",
          },
        }}
      >
        Cancelar venta
      </Button>

      <ConfirmDialog
        open={dialogoCancelarAbierto}
        title="Cancelar venta"
        description={`¿Estás seguro de que querés cancelar la venta #${numeroFormateado}? El stock de los productos volverá a estar disponible.`}
        confirmText="Cancelar venta"
        cancelText="Volver"
        loading={cancelandoVenta}
        onClose={() => {
          if (!cancelandoVenta) {
            setDialogoCancelarAbierto(false);
          }
        }}
        onConfirm={handleCancelarVenta}
      />
    </Box>
  );
}

export default VentaDetallePage;