import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";

function TopBar() {
  const nombre = localStorage.getItem("nombre") || "";
  const apellido = localStorage.getItem("apellido") || "";

  const nombreCompleto =
    `${nombre} ${apellido}`.trim() || "Usuario";

  const iniciales = `${nombre.charAt(0)}${apellido.charAt(0)}`
    .toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#333333",
        borderBottom: "1px solid #eeeeee",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 72,
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#2E7D32",
              lineHeight: 1.2,
            }}
          >
            El Pariente
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gestión frutihortícola
          </Typography>
        </Box>

        <UserMenu
          nombre={nombreCompleto}
          rol="Administrador"
          iniciales={iniciales}
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;