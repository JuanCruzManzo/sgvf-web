import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  Inventory2Rounded,
} from "@mui/icons-material";

interface ProductCardProps {
  nombre: string;
  descripcion?: string;
  stock: number;
  stockMinimo: number;
  onEditar?: () => void;
  onEliminar?: () => void;
}

function ProductCard({
  nombre,
  descripcion,
  stock,
  stockMinimo,
  onEditar,
  onEliminar,
}: ProductCardProps) {
  const sinStock = stock === 0;
  const tieneStockBajo = stock > 0 && stock <= stockMinimo;

  const colorEstado = sinStock
    ? "#D32F2F"
    : tieneStockBajo
      ? "#D97706"
      : "#2E7D32";

  const fondoEstado = sinStock
    ? "#FFEBEE"
    : tieneStockBajo
      ? "#FFF4E5"
      : "#E8F5E9";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #DDDDDD",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 1.75,
          "&:last-child": {
            pb: 1.75,
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "46px minmax(0, 1fr) auto",
            columnGap: 1.5,
            rowGap: 0.35,
            alignItems: "center",
          }}
        >
          {/* Ícono */}
          <Box
            sx={{
              gridColumn: 1,
              gridRow: "1 / span 3",
              width: 46,
              height: 46,
              alignSelf: "start",
              borderRadius: "13px",
              backgroundColor: fondoEstado,
              color: colorEstado,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2Rounded />
          </Box>

          {/* Nombre */}
          <Typography
            noWrap
            sx={{
              gridColumn: 2,
              gridRow: 1,
              width: "100%",
              textAlign: "left",
              fontSize: "0.98rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            {nombre}
          </Typography>

          {/* Acciones */}
          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              gridColumn: 3,
              gridRow: "1 / span 2",
              justifySelf: "end",
              alignSelf: "center",
            }}
          >
            <IconButton
              size="small"
              aria-label={`Editar producto ${nombre}`}
              onClick={onEditar}
              sx={{
                width: 32,
                height: 32,
                border: "1px solid #BDBDBD",
                borderRadius: "8px",
                color: "#616161",
                backgroundColor: "#F7F7F7",

                "&:hover": {
                  backgroundColor: "#EEEEEE",
                  borderColor: "#9E9E9E",
                },

                "&:active": {
                  backgroundColor: "#F7F7F7",
                },
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              aria-label={`Eliminar producto ${nombre}`}
              onClick={onEliminar}
              sx={{
                width: 32,
                height: 32,
                border: "1px solid #EF9A9A",
                borderRadius: "8px",
                color: "#E53935",
                backgroundColor: "#FFF5F5",

                "&:hover": {
                  backgroundColor: "#FFEBEE",
                  borderColor: "#E53935",
                },

                "&:active": {
                  backgroundColor: "#FFF5F5",
                },
              }}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Stack>

          {/* Descripción */}
          {descripcion && (
            <Typography
              noWrap
              sx={{
                gridColumn: 2,
                gridRow: 2,
                width: "100%",
                textAlign: "left",
                fontSize: "0.78rem",
                color: "text.secondary",
              }}
            >
              {descripcion}
            </Typography>
          )}

          {/* Stock */}
          <Box
            sx={{
              gridColumn: "2 / span 2",
              gridRow: 3,
              mt: 0.65,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.75,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: colorEstado,
              }}
            >
              {sinStock
                ? "Sin stock"
                : `Stock: ${stock} cajones`}
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
                  fontWeight: 700,
                }}
              />
            )}

            {sinStock && (
              <Chip
                label="Reponer"
                size="small"
                sx={{
                  height: 22,
                  backgroundColor: "#FFEBEE",
                  color: "#D32F2F",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;