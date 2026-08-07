import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Fab,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  SearchRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import ProductCard from "./components/ProductCard";

type FiltroStock = "todos" | "bajo" | "sinStock";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

const productosSimulados: Producto[] = [
  {
    id: 1,
    nombre: "Tomate redondo",
    descripcion: "Cajón de tomate de primera",
    stock: 28,
    stockMinimo: 5,
  },
  {
    id: 2,
    nombre: "Papa",
    descripcion: "Cajón de papa blanca",
    stock: 15,
    stockMinimo: 5,
  },
  {
    id: 3,
    nombre: "Lechuga de manteca",
    descripcion: "Cajón de lechuga fresca",
    stock: 4,
    stockMinimo: 6,
  },
  {
    id: 4,
    nombre: "Morrón colorado",
    descripcion: "Cajón de morrón",
    stock: 0,
    stockMinimo: 4,
  },
  {
    id: 5,
    nombre: "Zapallito redondo",
    descripcion: "Cajón de zapallito",
    stock: 12,
    stockMinimo: 5,
  },
];

function ProductosPage() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [filtroStock, setFiltroStock] =
    useState<FiltroStock>("todos");

  const [productoAEliminar, setProductoAEliminar] = useState<{
    id: number;
    nombre: string;
  } | null>(null);

  const [eliminando, setEliminando] = useState(false);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return productosSimulados.filter((producto) => {
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
  }, [busqueda, filtroStock]);

  const handleEliminarProducto = () => {
    if (!productoAEliminar) {
      return;
    }

    setEliminando(true);

    // Más adelante se reemplaza por el DELETE a la API.
    console.log("Producto eliminado:", productoAEliminar.id);

    setTimeout(() => {
      setEliminando(false);
      setProductoAEliminar(null);
    }, 600);
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
                <SearchRounded sx={{ color: "text.secondary" }} />
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
              filtroStock === "todos" ? "#2E7D32" : "#FFFFFF",
            color:
              filtroStock === "todos" ? "#FFFFFF" : "#555555",
            border: "1px solid",
            borderColor:
              filtroStock === "todos" ? "#2E7D32" : "#D5D5D5",
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
              filtroStock === "bajo" ? "#FFF4E5" : "#FFFFFF",
            color:
              filtroStock === "bajo" ? "#D97706" : "#555555",
            border: "1px solid",
            borderColor:
              filtroStock === "bajo" ? "#F5B85C" : "#D5D5D5",
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
              filtroStock === "sinStock" ? "#FFEBEE" : "#FFFFFF",
            color:
              filtroStock === "sinStock" ? "#D32F2F" : "#555555",
            border: "1px solid",
            borderColor:
              filtroStock === "sinStock" ? "#EF9A9A" : "#D5D5D5",
          }}
        />
      </Stack>

      {/* Cantidad de resultados */}
      <Typography
        sx={{
          mb: 1.25,
          fontSize: "0.78rem",
          color: "text.secondary",
        }}
      >
        {productosFiltrados.length} productos encontrados
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
              navigate(`/productos/${producto.id}/editar`);
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
          boxShadow: "0 8px 20px rgba(46, 125, 50, 0.25)",

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