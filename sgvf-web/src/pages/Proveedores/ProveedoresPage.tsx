import { useMemo, useState } from "react";
import {
  Box,
  Fab,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ProveedorCard from "./components/ProveedorCard";

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  saldoPendiente: number;
}

/**
 * Datos simulados para validar el diseño.
 *
 * TODO:
 * Reemplazar este arreglo por los proveedores
 * obtenidos desde la API.
 */
const proveedoresSimulados: Proveedor[] = [
  {
    id: 1,
    nombre: "Distribuidora El Sol",
    telefono: "223 555-4182",
    saldoPendiente: 120000,
  },
  {
    id: 2,
    nombre: "Frutas del Valle",
    telefono: "223 444-9021",
    saldoPendiente: 0,
  },
  {
    id: 3,
    nombre: "Mayorista San Martín",
    telefono: "223 333-7654",
    saldoPendiente: 78500,
  },
];

/**
 * Pantalla principal del módulo Proveedores.
 *
 * Permite consultar y buscar proveedores.
 * En una etapa posterior incorporará el CRUD
 * y la conexión con la API.
 */
function ProveedoresPage() {
  const [busqueda, setBusqueda] = useState("");

  /**
   * Filtra los proveedores por nombre o teléfono
   * mientras el usuario escribe en el buscador.
   */
  const proveedoresFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return proveedoresSimulados;
    }

    return proveedoresSimulados.filter(
      (proveedor) =>
        proveedor.nombre.toLowerCase().includes(texto) ||
        proveedor.telefono.toLowerCase().includes(texto)
    );
  }, [busqueda]);

  return (
    <Box>
      {/* Encabezado de la página */}
      <Box sx={{ mb: 2 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Proveedores
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: "0.88rem",
            color: "text.secondary",
          }}
        >
          Gestioná los proveedores del comercio.
        </Typography>
      </Box>

      {/* Buscador */}
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar por nombre o teléfono"
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      {/* Cantidad de resultados */}
      <Typography
        sx={{
          mb: 1.25,
          fontSize: "0.78rem",
          color: "text.secondary",
        }}
      >
        {proveedoresFiltrados.length} proveedores encontrados
      </Typography>

      {/* Listado de proveedores */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
        }}
      >
        {proveedoresFiltrados.map((proveedor) => (
          <ProveedorCard
            key={proveedor.id}
            nombre={proveedor.nombre}
            telefono={proveedor.telefono}
            saldoPendiente={proveedor.saldoPendiente}
            onVerMovimientos={() => {
              console.log("Ver movimientos de:", proveedor.nombre);
            }}
            onEditar={() => {
              console.log("Editar:", proveedor.nombre);
            }}
            onEliminar={() => {
              console.log("Eliminar:", proveedor.nombre);
            }}
          />
        ))}
      </Box>

      {/* Mensaje cuando la búsqueda no tiene resultados */}
      {proveedoresFiltrados.length === 0 && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            No encontramos proveedores
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          >
            Probá buscando con otro nombre o teléfono.
          </Typography>
        </Box>
      )}

      {/* Acción para registrar un proveedor nuevo */}
      <Fab
        aria-label="Agregar proveedor"
        onClick={() => {
          // Más adelante navegar a la pantalla de creación de proveedor.
        }}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 88,
          backgroundColor: "#2E7D32",
          color: "#FFFFFF",
          boxShadow: "0 8px 20px rgba(46, 125, 50, 0.25)",
          "&:hover": {
            backgroundColor: "#256628",
          },
        }}
      >
        <AddRoundedIcon />
      </Fab>
    </Box>
  );
}

export default ProveedoresPage;