import { Box, Typography } from "@mui/material";

/**
 * Muestra un saludo según el horario actual
 * y la fecha en español.
 */
function GreetingSection() {
  const ahora = new Date();
  
  // Devuelve solamente la hora actual, como un número entre 0 y 23.
  const hora = ahora.getHours();

  const obtenerSaludo = () => {
    if (hora >= 6 && hora < 12) {
      return "¡Buenos días!";
    }

    if (hora >= 12 && hora < 20) {
      return "¡Buenas tardes!";
    }

    return "¡Buenas noches!";
  };

  const fechaActual = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(ahora);

  const fechaCapitalizada =
    fechaActual.charAt(0).toUpperCase() + fechaActual.slice(1);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#333333",
        }}
      >
        {obtenerSaludo()} 👋
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "text.secondary",
          fontSize: "1rem",
        }}
      >
        {fechaCapitalizada}
      </Typography>
    </Box>
  );
}

export default GreetingSection;