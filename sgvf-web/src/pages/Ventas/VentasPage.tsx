import { Typography } from "@mui/material";

function VentasPage() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Ventas
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Próximamente se mostrará la gestión de las ventas.
      </Typography>
    </>
  );
}

export default VentasPage;