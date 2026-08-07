import { useMemo, useState } from "react";

import {
  AddRounded,
  SearchRounded,
} from "@mui/icons-material";

import {
  Box,
  Chip,
  Fab,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import VentaCard from "./components/VentaCard";

type EstadoPago = "Pagado" | "Pendiente";
type FiltroVenta = "todas" | "pagadas" | "pendientes";
type FiltroFecha = "todas" | "hoy" | "semana" | "mes";

interface Venta {
  id: number;
  cliente: string;
  fecha: string;
  total: number;
  estadoPago: EstadoPago;
  cantidadProductos: number;
}

const ventasSimuladas: Venta[] = [
  {
    id: 25,
    cliente: "Juan Pérez",
    fecha: "05/08/2026 13:42",
    total: 81000,
    estadoPago: "Pagado",
    cantidadProductos: 2,
  },
  {
    id: 24,
    cliente: "Consumidor final",
    fecha: "05/08/2026 12:18",
    total: 32000,
    estadoPago: "Pagado",
    cantidadProductos: 1,
  },
  {
    id: 23,
    cliente: "María Gómez",
    fecha: "05/08/2026 10:35",
    total: 67500,
    estadoPago: "Pagado",
    cantidadProductos: 3,
  },
  {
    id: 22,
    cliente: "Carlos Fernández",
    fecha: "04/08/2026 17:50",
    total: 44500,
    estadoPago: "Pendiente",
    cantidadProductos: 2,
  },
  {
    id: 21,
    cliente: "Consumidor final",
    fecha: "04/08/2026 15:10",
    total: 29000,
    estadoPago: "Pagado",
    cantidadProductos: 1,
  },
];
function convertirFecha(fecha: string) {
  const [parteFecha, parteHora = "00:00"] = fecha.split(" ");
  const [dia, mes, anio] = parteFecha.split("/").map(Number);
  const [hora, minutos] = parteHora.split(":").map(Number);

  return new Date(
    anio,
    mes - 1,
    dia,
    hora || 0,
    minutos || 0
  );
}

function VentasPage() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [filtroVenta, setFiltroVenta] =
    useState<FiltroVenta>("todas");

  const [filtroFecha, setFiltroFecha] =
    useState<FiltroFecha>("todas");

  const ventasFiltradas = useMemo(() => {
  const texto = busqueda.trim().toLowerCase();
  const ahora = new Date();

  return ventasSimuladas.filter((venta) => {
    const numeroVenta = venta.id.toString();

    const coincideBusqueda =
      !texto ||
      venta.cliente.toLowerCase().includes(texto) ||
      numeroVenta.includes(texto);

    const coincideEstado =
      filtroVenta === "todas" ||
      (filtroVenta === "pagadas" &&
        venta.estadoPago === "Pagado") ||
      (filtroVenta === "pendientes" &&
        venta.estadoPago === "Pendiente");

    const fechaVenta = convertirFecha(venta.fecha);

    const esHoy =
      fechaVenta.getDate() === ahora.getDate() &&
      fechaVenta.getMonth() === ahora.getMonth() &&
      fechaVenta.getFullYear() === ahora.getFullYear();

    const inicioSemana = new Date(ahora);
    inicioSemana.setDate(ahora.getDate() - 7);

    const inicioMes = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      1
    );

    const coincideFecha =
      filtroFecha === "todas" ||
      (filtroFecha === "hoy" && esHoy) ||
      (filtroFecha === "semana" &&
        fechaVenta >= inicioSemana &&
        fechaVenta <= ahora) ||
      (filtroFecha === "mes" &&
        fechaVenta >= inicioMes &&
        fechaVenta <= ahora);

      return coincideBusqueda && coincideEstado && coincideFecha;
    });
  }, [busqueda, filtroVenta, filtroFecha]);

  return (
    <Box>
      {/* Encabezado */}
      <Box sx={{ mb: 1.5 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Ventas
        </Typography>
      </Box>

      {/* Buscador */}
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar por cliente o número de venta"
        value={busqueda}
        onChange={(event) =>
          setBusqueda(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded
                  sx={{
                    color: "text.secondary",
                  }}
                />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          mb: 1.5,
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      {/* Filtros */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 2,
          overflowX: "auto",
          pb: 0.25,
        }}
      >
        <Chip
          label="Todas"
          clickable
          onClick={() => setFiltroVenta("todas")}
          sx={{
            flexShrink: 0,
            fontWeight: 700,
            backgroundColor:
              filtroVenta === "todas"
                ? "#2E7D32"
                : "#FFFFFF",
            color:
              filtroVenta === "todas"
                ? "#FFFFFF"
                : "#555555",
            border: "1px solid",
            borderColor:
              filtroVenta === "todas"
                ? "#2E7D32"
                : "#D5D5D5",
          }}
        />

        <Chip
          label="Pagadas"
          clickable
          onClick={() => setFiltroVenta("pagadas")}
          sx={{
            flexShrink: 0,
            fontWeight: 700,
            backgroundColor:
              filtroVenta === "pagadas"
                ? "#E8F5E9"
                : "#FFFFFF",
            color:
              filtroVenta === "pagadas"
                ? "#2E7D32"
                : "#555555",
            border: "1px solid",
            borderColor:
              filtroVenta === "pagadas"
                ? "#81C784"
                : "#D5D5D5",
          }}
        />

        <Chip
          label="Pendientes"
          clickable
          onClick={() => setFiltroVenta("pendientes")}
          sx={{
            flexShrink: 0,
            fontWeight: 700,
            backgroundColor:
              filtroVenta === "pendientes"
                ? "#FFF4E5"
                : "#FFFFFF",
            color:
              filtroVenta === "pendientes"
                ? "#D97706"
                : "#555555",
            border: "1px solid",
            borderColor:
              filtroVenta === "pendientes"
                ? "#F5B85C"
                : "#D5D5D5",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.25,
          }}
        >
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              overflowX: "auto",
              pb: 0.25,
            }}
          >
            {[
              { valor: "todas", texto: "Cualquier fecha" },
              { valor: "hoy", texto: "Hoy" },
              { valor: "semana", texto: "Últimos 7 días" },
              { valor: "mes", texto: "Este mes" },
            ].map((opcion) => {
              const seleccionado = filtroFecha === opcion.valor;

              return (
                <Chip
                  key={opcion.valor}
                  label={opcion.texto}
                  size="small"
                  clickable
                  onClick={() =>
                    setFiltroFecha(opcion.valor as FiltroFecha)
                  }
                  sx={{
                    flexShrink: 0,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    backgroundColor: seleccionado
                      ? "#E8F5E9"
                      : "#FFFFFF",
                    color: seleccionado
                      ? "#2E7D32"
                      : "#666666",
                    border: "1px solid",
                    borderColor: seleccionado
                      ? "#81C784"
                      : "#D5D5D5",
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      </Stack>

      {/* Cantidad de resultados */}
      <Typography
        sx={{
          mb: 1.25,
          fontSize: "0.76rem",
          fontWeight: 600,
          color: "text.secondary",
        }}
      >
        {ventasFiltradas.length}{" "}
        {ventasFiltradas.length === 1
          ? "venta"
          : "ventas"}
      </Typography>

      {/* Listado */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          pb: 11,
        }}
      >
        {ventasFiltradas.map((venta) => (
          <VentaCard
            key={venta.id}
            numeroVenta={venta.id}
            cliente={venta.cliente}
            fecha={venta.fecha}
            total={venta.total}
            estadoPago={venta.estadoPago}
            cantidadProductos={
              venta.cantidadProductos
            }
            onClick={() => {
              navigate(`/ventas/${venta.id}`);
            }}
          />
        ))}
      </Box>

      {/* Sin resultados */}
      {ventasFiltradas.length === 0 && (
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
            No encontramos ventas
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          >
            Probá modificando la búsqueda o el filtro.
          </Typography>
        </Box>
      )}

      {/* Nueva venta */}
      <Fab
        aria-label="Registrar venta"
        onClick={() => navigate("/ventas/nueva")}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 88,
          backgroundColor: "#2E7D32",
          color: "#FFFFFF",
          boxShadow:
            "0 8px 20px rgba(46, 125, 50, 0.25)",

          "&:hover": {
            backgroundColor: "#256628",
          },
        }}
      >
        <AddRounded />
      </Fab>
    </Box>
  );
}

export default VentasPage;