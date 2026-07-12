import { Typography } from "@mui/material";

function ClientesPage() {
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Clientes
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Próximamente se mostrará la gestión de clientes.
      </Typography>
    </>
  );
}

export default ClientesPage;