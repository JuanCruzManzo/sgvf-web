import {
  Avatar,
  Box,
  Card,
  Divider,
  Typography,
} from "@mui/material";

const ventasRecientes = [
  {
    id: 1,
    cliente: "Mercado Central",
    detalle: "5 cajones de tomate",
    total: "$85.000",
    hora: "10:35",
  },
  {
    id: 2,
    cliente: "Verdulería El Sol",
    detalle: "3 cajones de papa",
    total: "$48.000",
    hora: "09:50",
  },
  {
    id: 3,
    cliente: "Cliente mostrador",
    detalle: "2 cajones de choclo",
    total: "$31.500",
    hora: "08:40",
  },
];

/**
 * Presenta una vista previa de las últimas ventas registradas.
 *
 * Actualmente tiene información simulada para validar
 * el diseño antes de conectar el endpoint.
 */
function RecentSales() {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        component="h2"
        sx={{
          mb: 2,
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#333333",
        }}
      >
        Últimas ventas
      </Typography>

      <Card
        elevation={0}
        sx={{
          px: 2,
          borderRadius: "16px",
          border: "1px solid #EEEEEE",
          backgroundColor: "#FFFFFF",
        }}
      >
        {ventasRecientes.map((venta, index) => (
          <Box key={venta.id}>
            <Box
              sx={{
                py: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  backgroundColor: "#E8F5E9",
                  color: "#2E7D32",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                {venta.cliente.charAt(0)}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333333",
                  }}
                >
                  {venta.cliente}
                </Typography>

                <Typography
                  noWrap
                  sx={{
                    mt: 0.25,
                    fontSize: "0.8rem",
                    color: "text.secondary",
                  }}
                >
                  {venta.detalle} · {venta.hora}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#2E7D32",
                }}
              >
                {venta.total}
              </Typography>
            </Box>

            {index < ventasRecientes.length - 1 && <Divider />}
          </Box>
        ))}
      </Card>
    </Box>
  );
}

export default RecentSales;