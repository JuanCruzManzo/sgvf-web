import { useEffect, useMemo, useState } from "react";

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

import ConfirmDialog from "../../components/ConfirmDialog";
import ProductCard from "./components/ProductCard";

import {
  obtenerProductos,
  eliminarProducto,
  type Producto,
} from "../../services/productoService";

type FiltroStock = "todos" | "bajo" | "sinStock";

function ProductosPage() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);

  const [busqueda, setBusqueda] = useState("");
  const [filtroStock, setFiltroStock] =
    useState<FiltroStock>("todos");

  const [productoAEliminar, setProductoAEliminar] = useState<{
    id: number;
    nombre: string;
  } | null>(null);

  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setErrorCarga(false);

        const data = await obtenerProductos();

        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);

        setErrorCarga(true);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productos
      .filter((producto) => producto.activo)
      .filter((producto) => {
        const coincideBusqueda =
          !texto ||
          producto.nombre.toLowerCase().includes(texto) ||
          producto.descripcion.toLowerCase().includes(texto);

        const tieneStockBajo =
          producto.stock > 0 &&
          producto.stock <= producto.stockMinimo;

        const coincideFiltro =
          filtroStock === "todos" ||
          (filtroStock === "bajo" && tieneStockBajo) ||
          (filtroStock === "sinStock" && producto.stock === 0);

        return coincideBusqueda && coincideFiltro;
      });
  }, [productos, busqueda, filtroStock]);

  const handleEliminarProducto = async () => {
    if (!productoAEliminar) {
      return;
    }

    try {
      setEliminando(true);

      await eliminarProducto(productoAEliminar.id);

      setProductos((productosActuales) =>
        productosActuales.filter(
          (producto) => producto.id !== productoAEliminar.id
        )
      );

      setProductoAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar producto:", error);

      alert("No se pudo eliminar el producto.");
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
          Productos
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: "0.88rem",
            color: "text.secondary",
          }}
        >
          Consultá y administrá la mercadería disponible.
        </Typography>
      </Box>

      {/* Buscador */}
      <TextField
        fullWidth
        size="small"
        placeholder="Buscar por nombre o descripción"
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
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
          label="Todos"
          clickable
          onClick={() => setFiltroStock("todos")}
          sx={{
            flexShrink: 0,
            fontWeight: 700,

            backgroundColor:
              filtroStock === "todos"
                ? "#2E7D32"
                : "#FFFFFF",

            color:
              filtroStock === "todos"
                ? "#FFFFFF"
                : "#555555",

            border: "1px solid",

            borderColor:
              filtroStock === "todos"
                ? "#2E7D32"
                : "#D5D5D5",
          }}
        />

        <Chip
          label="Stock bajo"
          clickable
          onClick={() => setFiltroStock("bajo")}
          sx={{
            flexShrink: 0,
            fontWeight: 700,

            backgroundColor:
              filtroStock === "bajo"
                ? "#FFF4E5"
                : "#FFFFFF",

            color:
              filtroStock === "bajo"
                ? "#D97706"
                : "#555555",

            border: "1px solid",

            borderColor:
              filtroStock === "bajo"
                ? "#F5B85C"
                : "#D5D5D5",
          }}
        />

        <Chip
          label="Sin stock"
          clickable
          onClick={() => setFiltroStock("sinStock")}
          sx={{
            flexShrink: 0,
            fontWeight: 700,

            backgroundColor:
              filtroStock === "sinStock"
                ? "#FFEBEE"
                : "#FFFFFF",

            color:
              filtroStock === "sinStock"
                ? "#D32F2F"
                : "#555555",

            border: "1px solid",

            borderColor:
              filtroStock === "sinStock"
                ? "#EF9A9A"
                : "#D5D5D5",
          }}
        />
      </Stack>

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
            Cargando productos...
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
            No pudimos cargar los productos
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          >
            No pudimos cargar los productos. Intentá nuevamente.
          </Typography>
        </Box>
      )}

      {/* Contenido cargado correctamente */}
      {!cargando && !errorCarga && (
        <>
          {/* Cantidad de resultados */}
          <Typography
            sx={{
              mb: 1.25,
              fontSize: "0.78rem",
              color: "text.secondary",
            }}
          >
            {productosFiltrados.length}{" "}
            {productosFiltrados.length === 1
              ? "producto encontrado"
              : "productos encontrados"}
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
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                stock={producto.stock}
                stockMinimo={producto.stockMinimo}
                onEditar={() => {
                  navigate(
                    `/productos/${producto.id}/editar`
                  );
                }}
                onEliminar={() => {
                  setProductoAEliminar({
                    id: producto.id,
                    nombre: producto.nombre,
                  });
                }}
              />
            ))}
          </Box>

          {/* Sin resultados */}
          {productosFiltrados.length === 0 && (
            <Box
              sx={{
                py: 6,
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>
                No encontramos productos
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: "0.85rem",
                  color: "text.secondary",
                }}
              >
                Probá modificando la búsqueda o el filtro seleccionado.
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* Nuevo producto */}
      <Fab
        aria-label="Agregar producto"
        onClick={() => navigate("/productos/nuevo")}
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

      {/* Confirmación de eliminación */}
      <ConfirmDialog
        open={Boolean(productoAEliminar)}
        title="Eliminar producto"
        description={
          productoAEliminar
            ? `¿Estás seguro de que querés eliminar ${productoAEliminar.nombre}?`
            : ""
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={eliminando}
        onClose={() => {
          if (!eliminando) {
            setProductoAEliminar(null);
          }
        }}
        onConfirm={handleEliminarProducto}
      />
    </Box>
  );
}

export default ProductosPage;