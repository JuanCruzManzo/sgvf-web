import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Typography,
} from "@mui/material";
import {
  ChevronRightRounded,
  PersonOutlineRounded,
  ReceiptLongOutlined,
} from "@mui/icons-material";

type EstadoPago = "Pagado" | "Pendiente";

interface VentaCardProps {
  numeroVenta: number;
  cliente: string;
  fecha: string;
  total: number;
  estadoPago: EstadoPago;
  cantidadProductos: number;
  onClick?: () => void;
}

function VentaCard({
  numeroVenta,
  cliente,
  fecha,
  total,
  estadoPago,
  cantidadProductos,
  onClick,
}: VentaCardProps) {
  const estaPagada = estadoPago === "Pagado";

  const totalFormateado = total.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const numeroFormateado = numeroVenta
    .toString()
    .padStart(4, "0");

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
      <CardActionArea
        onClick={onClick}
        sx={{
          p: 1.75,
          display: "grid",
          gridTemplateColumns: "44px minmax(0, 1fr) auto",
          columnGap: 1.5,
          rowGap: 0.45,
          alignItems: "center",
        }}
      >
        {/* Ícono */}
        <Box
          sx={{
            gridColumn: 1,
            gridRow: "1 / span 3",
            width: 44,
            height: 44,
            alignSelf: "start",
            borderRadius: "12px",
            backgroundColor: estaPagada ? "#E8F5E9" : "#FFF4E5",
            color: estaPagada ? "#2E7D32" : "#D97706",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReceiptLongOutlined />
        </Box>

        {/* Cliente */}
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
          {cliente}
        </Typography>

        {/* Flecha */}
        <ChevronRightRounded
          sx={{
            gridColumn: 3,
            gridRow: "1 / span 3",
            alignSelf: "center",
            color: "text.disabled",
          }}
        />

        {/* Número y fecha */}
        <Box
          sx={{
            gridColumn: 2,
            gridRow: 2,
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            minWidth: 0,
          }}
        >
          <PersonOutlineRounded
            sx={{
              flexShrink: 0,
              fontSize: "0.9rem",
              color: "text.secondary",
            }}
          />

          <Typography
            noWrap
            sx={{
              fontSize: "0.77rem",
              color: "text.secondary",
            }}
          >
            Venta #{numeroFormateado} · {fecha}
          </Typography>
        </Box>

        {/* Estado, cantidad y total */}
        <Box
          sx={{
            gridColumn: 2,
            gridRow: 3,
            mt: 0.65,
            pt: 0.85,
            borderTop: "1px solid #E5E5E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.75,
            }}
          >
            <Chip
              label={estadoPago}
              size="small"
              sx={{
                height: 22,
                backgroundColor: estaPagada ? "#E8F5E9" : "#FFF4E5",
                color: estaPagada ? "#2E7D32" : "#D97706",
                fontSize: "0.68rem",
                fontWeight: 700,
              }}
            />

            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              {cantidadProductos}{" "}
              {cantidadProductos === 1 ? "producto" : "productos"}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 800,
              color: "#2E7D32",
            }}
          >
            {totalFormateado}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default VentaCard;