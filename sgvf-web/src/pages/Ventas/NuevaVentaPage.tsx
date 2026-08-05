import {
  AddRounded,
  ArrowBackRounded,
  CheckCircleOutlineRounded,
  PersonOutlineRounded,
  PointOfSaleOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AgregarProductoVentaDialog from "./components/AgregarProductoVentaDialog";
import VentaProductoCard from "./components/VentaProductoCard";
import VentaRegistradaDialog from "./components/VentaRegistradaDialog";

interface ClienteDisponible {
  id: number;
  nombre: string;
}

interface ProductoDisponible {
  id: number;
  nombre: string;
  stock: number;
}

interface ProductoAgregado {
  productoId: number;
  nombre: string;
  cantidadCajones: number;
  precioUnitario: number;
}

type EstadoPago = "Pagado" | "Pendiente";

const CONSUMIDOR_FINAL = "consumidor-final";

const clientesSimulados: ClienteDisponible[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
  },
  {
    id: 2,
    nombre: "María Gómez",
  },
  {
    id: 3,
    nombre: "Carlos Fernández",
  },
];

const productosDisponibles: ProductoDisponible[] = [
  {
    id: 1,
    nombre: "Tomate redondo",
    stock: 28,
  },
  {
    id: 2,
    nombre: "Papa",
    stock: 15,
  },
  {
    id: 3,
    nombre: "Lechuga de manteca",
    stock: 4,
  },
  {
    id: 4,
    nombre: "Morrón colorado",
    stock: 0,
  },
  {
    id: 5,
    nombre: "Zapallito redondo",
    stock: 12,
  },
];

function NuevaVentaPage() {
  const navigate = useNavigate();

  const [clienteId, setClienteId] = useState(CONSUMIDOR_FINAL);
  const [estadoPago, setEstadoPago] =
    useState<EstadoPago>("Pagado");

  const [productosAgregados, setProductosAgregados] = useState<
    ProductoAgregado[]
  >([]);

  const [dialogoProductoAbierto, setDialogoProductoAbierto] =
    useState(false);

  const [productoEnEdicion, setProductoEnEdicion] =
    useState<ProductoAgregado | null>(null);

  const [guardandoProducto, setGuardandoProducto] =
    useState(false);

  const [confirmandoVenta, setConfirmandoVenta] =
    useState(false);

  const totalVenta = useMemo(() => {
    return productosAgregados.reduce(
      (total, producto) =>
        total +
        producto.cantidadCajones *
          producto.precioUnitario,
      0
    );
  }, [productosAgregados]);

  const totalFormateado = totalVenta.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const abrirDialogoAgregar = () => {
    setProductoEnEdicion(null);
    setDialogoProductoAbierto(true);
  };

  const abrirDialogoEditar = (producto: ProductoAgregado) => {
    setProductoEnEdicion(producto);
    setDialogoProductoAbierto(true);
  };

  const cerrarDialogoProducto = () => {
    if (guardandoProducto) {
      return;
    }

    setDialogoProductoAbierto(false);
    setProductoEnEdicion(null);
  };

  const handleGuardarProducto = (values: {
    productoId: number;
    cantidadCajones: number;
    precioUnitario: number;
  }) => {
    const productoDisponible = productosDisponibles.find(
      (producto) => producto.id === values.productoId
    );

    if (!productoDisponible) {
      return;
    }

    setGuardandoProducto(true);

    setTimeout(() => {
      if (productoEnEdicion) {
        setProductosAgregados((estadoAnterior) =>
          estadoAnterior.map((producto) =>
            producto.productoId ===
            productoEnEdicion.productoId
              ? {
                  ...producto,
                  cantidadCajones:
                    values.cantidadCajones,
                  precioUnitario:
                    values.precioUnitario,
                }
              : producto
          )
        );
      } else {
        const productoYaAgregado =
          productosAgregados.some(
            (producto) =>
              producto.productoId === values.productoId
          );

        if (!productoYaAgregado) {
          setProductosAgregados((estadoAnterior) => [
            ...estadoAnterior,
            {
              productoId: values.productoId,
              nombre: productoDisponible.nombre,
              cantidadCajones:
                values.cantidadCajones,
              precioUnitario:
                values.precioUnitario,
            },
          ]);
        }
      }

      setGuardandoProducto(false);
      setDialogoProductoAbierto(false);
      setProductoEnEdicion(null);
    }, 400);
  };

  const handleEliminarProducto = (productoId: number) => {
    setProductosAgregados((estadoAnterior) =>
      estadoAnterior.filter(
        (producto) =>
          producto.productoId !== productoId
      )
    );
  };

  const [dialogoVentaRegistrada, setDialogoVentaRegistrada] =
  useState(false);

  const [ventaRegistradaId, setVentaRegistradaId] =
  useState<number | null>(null);

  const handleConfirmarVenta = () => {
    if (productosAgregados.length === 0) {
      return;
    }

    setConfirmandoVenta(true);

    const venta = {
      clienteId:
        clienteId === CONSUMIDOR_FINAL
        ? null
        : Number(clienteId),
      estadoPago,
      detalles: productosAgregados.map((producto) => ({
        productoId: producto.productoId,
        cantidadCajones: producto.cantidadCajones,
        precioUnitario: producto.precioUnitario,
      })),
    };

    console.log("Venta a registrar:", venta);

      setTimeout(() => {
      const idSimulado = 26;

      setConfirmandoVenta(false);
      setVentaRegistradaId(idSimulado);
      setDialogoVentaRegistrada(true);
    }, 700);
      };

  return (
    <Box sx={{ pb: 12 }}>
      {/* Encabezado */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 40px",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          aria-label="Volver"
          onClick={() => navigate("/ventas")}
          sx={{
            width: 40,
            height: 40,
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
        </IconButton>

        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Nueva venta
        </Typography>

        {/* Columna vacía para mantener el título centrado */}
        <Box />
      </Box>

      {/* Cliente */}
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
              gap: 1,
              mb: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                backgroundColor: "#E8F5E9",
                color: "#2E7D32",
              }}
            >
              <PersonOutlineRounded sx={{ fontSize: 22 }} />
            </Avatar>

            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              Cliente
            </Typography>
          </Box>

          <TextField
            select
            fullWidth
            label="Seleccionar cliente"
            value={clienteId}
            onChange={(event) => {
              const nuevoClienteId = event.target.value;

              setClienteId(nuevoClienteId);

              if (nuevoClienteId === CONSUMIDOR_FINAL) {
                setEstadoPago("Pagado");
              }
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            <MenuItem value={CONSUMIDOR_FINAL}>
              Consumidor final
            </MenuItem>

            {clientesSimulados.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </TextField>
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
            label={
              productosAgregados.length === 1
                ? "1 agregado"
                : `${productosAgregados.length} agregados`
            }
            size="small"
            sx={{
              minWidth: 34,
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              fontSize: "0.72rem",
              fontWeight: 700,
            }}
          />
        </Box>

        <Stack spacing={1.25}>
          {productosAgregados.map((producto) => (
            <VentaProductoCard
              key={producto.productoId}
              nombre={producto.nombre}
              cantidadCajones={
                producto.cantidadCajones
              }
              precioUnitario={
                producto.precioUnitario
              }
              onEditar={() =>
                abrirDialogoEditar(producto)
              }
              onEliminar={() =>
                handleEliminarProducto(
                  producto.productoId
                )
              }
            />
          ))}
        </Stack>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddRounded />}
          onClick={abrirDialogoAgregar}
          sx={{
            mt: productosAgregados.length > 0 ? 1.5 : 0,
            minHeight: 48,
            borderRadius: "12px",
            borderStyle: "dashed",
            borderWidth: "1.5px",
            borderColor: "#81C784",
            color: "#2E7D32",
            fontWeight: 700,
            textTransform: "none",
            backgroundColor: "#F8FCF8",

            "&:hover": {
              borderStyle: "dashed",
              borderWidth: "1.5px",
              borderColor: "#4CAF50",
              backgroundColor: "#E8F5E9",
            },
          }}
        >
          Agregar producto
        </Button>
      </Box>

      {/* Pago y resumen */}
      <Card
        elevation={0}
        sx={{
          mt: 2.25,
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
              gap: 1,
              mb: 1.5,
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                backgroundColor: "#E8F5E9",
                color: "#2E7D32",
              }}
            >
              <PointOfSaleOutlined sx={{ fontSize: 22 }} />
            </Avatar>

            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              Estado del pago
            </Typography>
          </Box>
          <ToggleButtonGroup
            exclusive
            fullWidth
            value={estadoPago}
            onChange={(_, nuevoEstado: EstadoPago | null) => {
              if (nuevoEstado) {
                setEstadoPago(nuevoEstado);
              }
            }}
            sx={{
              "& .MuiToggleButton-root": {
                minHeight: 44,
                borderColor: "#D5D5D5",
                textTransform: "none",
                fontWeight: 700,
              },

              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "#E8F5E9",
                color: "#2E7D32",
                borderColor: "#81C784",
              },

              "& .MuiToggleButton-root.Mui-selected:hover": {
                backgroundColor: "#E8F5E9",
              },
            }}
          >
            <ToggleButton value="Pagado">
              Pagado
            </ToggleButton>

            <ToggleButton
              value="Pendiente"
              disabled={clienteId === CONSUMIDOR_FINAL}
            >
              Pendiente
            </ToggleButton>
          </ToggleButtonGroup>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "text.secondary",
                }}
              >
                Total de la venta
              </Typography>

              <Typography
                sx={{
                  mt: 0.15,
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#2E7D32",
                }}
              >
                {totalFormateado}
              </Typography>
            </Box>

            <Typography
              sx={{
                pb: 0.35,
                fontSize: "0.78rem",
                color: "text.secondary",
              }}
            >
              {productosAgregados.length}{" "}
              {productosAgregados.length === 1
                ? "producto"
                : "productos"}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Confirmar */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<CheckCircleOutlineRounded />}
        onClick={handleConfirmarVenta}
        disabled={
          confirmandoVenta ||
          productosAgregados.length === 0
        }
        sx={{
          mt: 2,
          minHeight: 52,
          borderRadius: "14px",
          backgroundColor: "#2E7D32",
          fontWeight: 700,
          fontSize: "0.98rem",
          textTransform: "none",
          boxShadow: "none",

          "&:hover": {
            backgroundColor: "#256628",
            boxShadow: "none",
          },
        }}
      >
        {confirmandoVenta
          ? "Registrando venta..."
          : "Confirmar venta"}
      </Button>

      <AgregarProductoVentaDialog
        open={dialogoProductoAbierto}
        productos={productosDisponibles}
        initialValues={
          productoEnEdicion
            ? {
                productoId:
                  productoEnEdicion.productoId,
                cantidadCajones:
                  productoEnEdicion.cantidadCajones,
                precioUnitario:
                  productoEnEdicion.precioUnitario,
              }
            : undefined
        }
        loading={guardandoProducto}
        onClose={cerrarDialogoProducto}
        onSubmit={handleGuardarProducto}
      />
      {ventaRegistradaId !== null && (
        <VentaRegistradaDialog
          open={dialogoVentaRegistrada}
          numeroVenta={ventaRegistradaId}
          onImprimir={() => {
            console.log(
              "Imprimir ticket de la venta:",
              ventaRegistradaId
            );
          }}
          onVerDetalle={() => {
            navigate(`/ventas/${ventaRegistradaId}`);
          }}
          onVolverVentas={() => {
            navigate("/ventas", {
              replace: true,
            });
          }}
        />
      )}
    </Box>
  );
}

export default NuevaVentaPage;