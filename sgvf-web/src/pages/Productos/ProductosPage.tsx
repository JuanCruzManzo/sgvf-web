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
import ProductCard from "./components/ProductCard";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

/**
 * Datos simulados para validar el diseño.
 *
 * TODO:
 * Reemplazar este arreglo por los productos obtenidos desde la API.
 */
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
    stock: 3,
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

/**
 * Pantalla principal del módulo Productos.
 *
 * Permite consultar el stock y buscar productos.
 * En una etapa posterior incorporará el CRUD y la conexión con la API.
 */
function ProductosPage() {
  const [busqueda, setBusqueda] = useState("");

  /**
   * Filtra los productos por nombre a medida que
   * el usuario escribe en el buscador.
   */
  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    if (!texto) {
      return productosSimulados;
    }

    return productosSimulados.filter((producto) =>
      producto.nombre.toLowerCase().includes(texto)
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
        placeholder="Buscar producto"
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
        {productosFiltrados.length} productos encontrados
      </Typography>

      {/* Listado de productos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
        }}
      >
        {productosFiltrados.map((producto) => (
          <ProductCard
            key={producto.id}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            stock={producto.stock}
            stockMinimo={producto.stockMinimo}
          />
        ))}
      </Box>

      {/* Mensaje cuando la búsqueda no tiene resultados */}
      {productosFiltrados.length === 0 && (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>
            No encontramos productos
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: "0.85rem",
              color: "text.secondary",
            }}
          >
            Probá buscando con otro nombre.
          </Typography>
        </Box>
      )}

      {/* Acción para registrar un producto nuevo */}
      <Fab
        aria-label="Agregar producto"
        onClick={() => {
          // Navegar a la pantalla de creación de producto.
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

export default ProductosPage;