import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Typography,
} from "@mui/material";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface ProductCardProps {
  nombre: string;
  descripcion?: string;
  stock: number;
  stockMinimo: number;
}

/**
 * Representa un producto dentro del listado.
 *
 * Muestra la cantidad disponible y advierte visualmente
 * cuando el stock es igual o inferior al mínimo establecido.
 */
function ProductCard({
  nombre,
  descripcion,
  stock,
  stockMinimo,
}: ProductCardProps) {
  const tieneStockBajo = stock <= stockMinimo;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #EEEEEE",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <CardActionArea
        sx={{
          p: 1.75,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* Ícono representativo del producto */}
        <Box
          sx={{
            width: 46,
            height: 46,
            flexShrink: 0,
            borderRadius: "13px",
            backgroundColor: tieneStockBajo ? "#FFF4E5" : "#E8F5E9",
            color: tieneStockBajo ? "#ED8A00" : "#2E7D32",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Inventory2RoundedIcon />
        </Box>

        {/* Información principal */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            noWrap
            sx={{
              fontSize: "0.98rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            {nombre}
          </Typography>

          {descripcion && (
            <Typography
              noWrap
              sx={{
                mt: 0.15,
                fontSize: "0.78rem",
                color: "text.secondary",
              }}
            >
              {descripcion}
            </Typography>
          )}

          <Box
            sx={{
              mt: 0.75,
              display: "flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.82rem",
                color: "text.secondary",
              }}
            >
              Stock:
            </Typography>

            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: tieneStockBajo ? "#D97706" : "#2E7D32",
              }}
            >
              {stock} cajones
            </Typography>

            {tieneStockBajo && (
              <Chip
                label="Stock bajo"
                size="small"
                sx={{
                  height: 22,
                  backgroundColor: "#FFF4E5",
                  color: "#D97706",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                }}
              />
            )}
          </Box>
        </Box>

        <ChevronRightRoundedIcon sx={{ color: "text.disabled" }} />
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;