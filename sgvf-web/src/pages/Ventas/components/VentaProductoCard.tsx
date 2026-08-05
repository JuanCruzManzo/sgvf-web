import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";

interface VentaProductoCardProps {
  nombre: string;
  cantidadCajones: number;
  precioUnitario: number;
  onEditar?: () => void;
  onEliminar?: () => void;
}

function VentaProductoCard({
  nombre,
  cantidadCajones,
  precioUnitario,
  onEditar,
  onEliminar,
}: VentaProductoCardProps) {
  const subtotal = cantidadCajones * precioUnitario;

  const precioFormateado = precioUnitario.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const subtotalFormateado = subtotal.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

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
            gridTemplateColumns: "44px minmax(0, 1fr) auto",
            columnGap: 1.5,
            rowGap: 0.35,
            alignItems: "center",
          }}
        >
          {/* Ícono del producto */}
          <Box
            sx={{
              gridColumn: 1,
              gridRow: "1 / span 3",
              width: 44,
              height: 44,
              alignSelf: "start",
              borderRadius: "12px",
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2Outlined />
          </Box>

          {/* Nombre */}
          <Typography
            noWrap
            sx={{
              gridColumn: 2,
              gridRow: 1,
              width: "100%",
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
              aria-label={`Editar ${nombre}`}
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
              }}
            >
              <EditOutlined fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              aria-label={`Eliminar ${nombre}`}
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
              }}
            >
              <DeleteOutlined fontSize="small" />
            </IconButton>
          </Stack>

          {/* Cantidad y precio unitario */}
          <Typography
            sx={{
              gridColumn: 2,
              gridRow: 2,
              fontSize: "0.79rem",
              color: "text.secondary",
            }}
          >
            {cantidadCajones}{" "}
            {cantidadCajones === 1 ? "cajón" : "cajones"} ·{" "}
            {precioFormateado} c/u
          </Typography>

          {/* Subtotal */}
          <Box
            sx={{
              gridColumn: "2 / span 2",
              gridRow: 3,
              mt: 0.75,
              pt: 0.85,
              borderTop: "1px solid #E5E5E5",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "text.secondary",
              }}
            >
              Subtotal
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#2E7D32",
              }}
            >
              {subtotalFormateado}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default VentaProductoCard;