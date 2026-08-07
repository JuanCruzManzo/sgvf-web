import { useEffect, useMemo, useState } from "react";
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
import ConfirmDialog from "../../components/ConfirmDialog";
import { obtenerClientes, type Cliente } from "../../services/clienteService";

function ClientesPage() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };

    cargarClientes();
  }, []);

  const clientesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return clientes;
    }

    return clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(texto) ||
        cliente.telefono.toLowerCase().includes(texto)
    );
  }, [busqueda, clientes]);

  const [clienteAEliminar, setClienteAEliminar] = useState<{
    id: number;
    nombre: string;
  } | null>(null);

  const [eliminando, setEliminando] = useState(false);

  const handleEliminarCliente = () => {
    if (!clienteAEliminar) return;

    setEliminando(true);

    // Más adelante se reemplaza por el DELETE a la API.
    console.log("Cliente eliminado:", clienteAEliminar.id);

    setTimeout(() => {
      setEliminando(false);
      setClienteAEliminar(null);
    }, 600);
  };

  return (
    <Box sx={{ mb: 2 }}>
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
              navigate(`/clientes/${cliente.id}/editar`);
            }}
            onEliminar={() => {
              setClienteAEliminar({
                id: cliente.id,
                nombre: cliente.nombre,
              });
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
        onClick={() => navigate("/clientes/nuevo")}
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

      <ConfirmDialog
        open={Boolean(clienteAEliminar)}
        title="Eliminar cliente"
        description={
          clienteAEliminar
            ? `¿Estás seguro de que querés eliminar a ${clienteAEliminar.nombre}?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={eliminando}
        onClose={() => {
          if (!eliminando) {
            setClienteAEliminar(null);
          }
        }}
        onConfirm={handleEliminarCliente}
      />
    </Box>
  );
}

export default ClientesPage;