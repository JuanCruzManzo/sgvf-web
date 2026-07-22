import {
  Stack,
  Typography,
} from "@mui/material";
import ClienteCard from "./components/ClienteCard";

function ClientesPage() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700 }}
      >
        Clientes
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Gestioná los clientes del comercio.
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <ClienteCard
          nombre="Juan Pérez"
          telefono="223 555-1234"
        />

        <ClienteCard
          nombre="María Gómez"
          telefono="223 444-5678"
        />

        <ClienteCard
          nombre="Carlos Fernández"
          telefono="223 333-9012"
        />
      </Stack>
    </>
  );
}

export default ClientesPage;