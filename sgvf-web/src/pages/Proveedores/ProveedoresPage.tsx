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

import ProveedorCard from "./components/ProveedorCard";
import ConfirmDialog from "../../components/ConfirmDialog";

import {
  eliminarProveedor,
  obtenerProveedores,
  type Proveedor,
} from "../../services/proveedorService";

function ProveedoresPage() {
  const navigate = useNavigate();

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);

  const [busqueda, setBusqueda] = useState("");

  const [proveedorAEliminar, setProveedorAEliminar] = useState<{
    id: number;
    nombre: string;
  } | null>(null);

  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const cargarProveedores = async () => {
      try {
        setCargando(true);
        setErrorCarga(false);

        const data = await obtenerProveedores();

        setProveedores(data);
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
        setErrorCarga(true);
      } finally {
        setCargando(false);
      }
    };

    cargarProveedores();
  }, []);

  const proveedoresFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return proveedores
      .filter((proveedor) => proveedor.activo)
      .filter((proveedor) => {
        if (!texto) {
          return true;
        }

        return (
          proveedor.nombre.toLowerCase().includes(texto) ||
          proveedor.telefono.toLowerCase().includes(texto)
        );
      });
  }, [proveedores, busqueda]);

  const handleEliminarProveedor = async () => {
    if (!proveedorAEliminar) {
      return;
    }

    try {
      setEliminando(true);

      await eliminarProveedor(proveedorAEliminar.id);

      setProveedores((proveedoresActuales) =>
        proveedoresActuales.filter(
          (proveedor) =>
            proveedor.id !== proveedorAEliminar.id
        )
      );

      setProveedorAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);

      alert("No se pudo eliminar el proveedor.");
    } finally {
      setEliminando(false);
    }
  };

  return (
    <Box>
      {/* Encabezado */}
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
                <SearchRoundedIcon
                  sx={{
                    color: "text.secondary",
                  }}
                />
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

      {/* Cargando */}
      {cargando && (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          >
            Cargando proveedores...
          </Typography>
        </Box>
      )}

      {/* Error */}
      {!cargando && errorCarga && (
        <Box
          sx={{
            py: 5,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: "#333333",
            }}
          >
            No pudimos cargar los proveedores
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          >
            Verificá que el servidor esté funcionando.
          </Typography>
        </Box>
      )}

      {/* Contenido */}
      {!cargando && !errorCarga && (
        <>
          {/* Cantidad */}
          <Typography
            sx={{
              mb: 1.25,
              fontSize: "0.78rem",
              color: "text.secondary",
            }}
          >
            {proveedoresFiltrados.length}{" "}
            {proveedoresFiltrados.length === 1
              ? "proveedor encontrado"
              : "proveedores encontrados"}
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
            {proveedoresFiltrados.map((proveedor) => (
              <ProveedorCard
                key={proveedor.id}
                nombre={proveedor.nombre}
                telefono={proveedor.telefono}
                saldoPendiente={proveedor.saldoPendiente}
                onVerMovimientos={() => {
                  navigate(`/proveedores/${proveedor.id}`);
                }}
                onEditar={() => {
                  navigate(
                    `/proveedores/${proveedor.id}/editar`
                  );
                }}
                onEliminar={() => {
                  setProveedorAEliminar({
                    id: proveedor.id,
                    nombre: proveedor.nombre,
                  });
                }}
              />
            ))}
          </Box>

          {/* Sin resultados */}
          {proveedoresFiltrados.length === 0 && (
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
        </>
      )}

      {/* Nuevo proveedor */}
      <Fab
        aria-label="Agregar proveedor"
        onClick={() => navigate("/proveedores/nuevo")}
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
        <AddRoundedIcon />
      </Fab>

      {/* Confirmación */}
      <ConfirmDialog
        open={Boolean(proveedorAEliminar)}
        title="Eliminar proveedor"
        description={
          proveedorAEliminar
            ? `¿Estás seguro de que querés eliminar a ${proveedorAEliminar.nombre}?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={eliminando}
        onClose={() => {
          if (!eliminando) {
            setProveedorAEliminar(null);
          }
        }}
        onConfirm={handleEliminarProveedor}
      />
    </Box>
  );
}

export default ProveedoresPage;