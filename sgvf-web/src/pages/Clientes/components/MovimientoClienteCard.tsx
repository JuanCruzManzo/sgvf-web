import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

type TipoMovimiento = "deuda" | "cobro";

interface MovimientoClienteCardProps {
  tipo: TipoMovimiento;
  fecha: string;
  monto: number;
  descripcion: string;
}

function MovimientoClienteCard({
  tipo,
  fecha,
  monto,
  descripcion,
}: MovimientoClienteCardProps) {
  const esDeuda = tipo === "deuda";

  const montoFormateado = monto.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "14px",
        border: "1px solid #DDDDDD",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
      }}
    >
      <CardContent
        sx={{
          p: 1.5,
          "&:last-child": {
            pb: 1.5,
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "38px minmax(0, 1fr) auto",
            columnGap: 1.25,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: esDeuda ? "#FFEBEE" : "#E8F5E9",
              color: esDeuda ? "#D32F2F" : "#2E7D32",
            }}
          >
            {esDeuda ? (
              <ArrowUpwardRounded fontSize="small" />
            ) : (
              <ArrowDownwardRounded fontSize="small" />
            )}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              {descripcion}
            </Typography>

            <Typography
              sx={{
                mt: 0.2,
                fontSize: "0.76rem",
                color: "text.secondary",
              }}
            >
              {fecha}
            </Typography>
          </Box>

          <Typography
            noWrap
            sx={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color: esDeuda ? "#D32F2F" : "#2E7D32",
            }}
          >
            {esDeuda ? "+" : "-"}
            {montoFormateado}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovimientoClienteCard;