import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentValue = () => {
    if (location.pathname.startsWith("/ventas")) return "/ventas/nueva";
    if (location.pathname.startsWith("/productos")) return "/productos";
    return "/";
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
    >
      <BottomNavigation
        value={getCurrentValue()}
        onChange={(_, newValue) => navigate(newValue)}
        showLabels
        sx={{
          "& .Mui-selected": {
            color: "#2E7D32",
          },
        }}
      >
        <BottomNavigationAction
          label="Inicio"
          value="/"
          icon={<HomeRoundedIcon />}
        />

        <BottomNavigationAction
          label="Venta"
          value="/ventas/nueva"
          icon={<ShoppingCartRoundedIcon />}
        />

        <BottomNavigationAction
          label="Stock"
          value="/productos"
          icon={<Inventory2RoundedIcon />}
        />

        <BottomNavigationAction
          label="Estadísticas"
          value="/estadisticas"
          icon={<BarChartIcon/>}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;