import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Fab,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ClienteCard from "./components/ClienteCard";

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  saldoPendiente: number;
}

const clientesSimulados: Cliente[] = [
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

function ClientesPage() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");

  const clientesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return clientesSimulados;
    }

    return clientesSimulados.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(texto) ||
        cliente.telefono.toLowerCase().includes(texto)
    );
  }, [busqueda]);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Clientes
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: "0.88rem",
            color: "text.secondary",
          }}
        >
          Gestioná los clientes del comercio.
        </Typography>
      </Box>

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

      <Typography
        sx={{
          mb: 1.25,
          fontSize: "0.78rem",
          color: "text.secondary",
        }}
      >
        {clientesFiltrados.length} clientes encontrados
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
          pb: 11,
        }}
      >
        {clientesFiltrados.map((cliente) => (
          <ClienteCard
            key={cliente.id}
            nombre={cliente.nombre}
            telefono={cliente.telefono}
            saldoPendiente={cliente.saldoPendiente}
            onVerMovimientos={() => {
              navigate(`/clientes/${cliente.id}`);
            }}
            onEditar={() => {
              console.log("Editar:", cliente.nombre);
            }}
            onEliminar={() => {
              console.log("Eliminar:", cliente.nombre);
            }}
          />
        ))}
      </Box>

      {clientesFiltrados.length === 0 && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            No encontramos clientes
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

      <Fab
        aria-label="Agregar cliente"
        onClick={() => {
          // Más adelante navegar a la pantalla de creación de cliente.
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

export default ClientesPage;