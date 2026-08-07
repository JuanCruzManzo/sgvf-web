import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";

function TopBar() {
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
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 72 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2E7D32", lineHeight: 1.2 }}
          >
            El Pariente
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gestión frutihortícola
          </Typography>
        </Box>

        <UserMenu
          nombre="Juan Rodríguez"
          rol="Administrador"
          iniciales="JR"
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;