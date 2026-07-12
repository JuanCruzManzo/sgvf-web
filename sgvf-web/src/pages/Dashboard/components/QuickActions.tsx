import { Box, Card, CardActionArea, Typography } from "@mui/material";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import { useNavigate } from "react-router-dom";

const acciones = [
  {
    label: "Productos",
    path: "/productos",
    icon: <Inventory2RoundedIcon />,
  },
  {
    label: "Clientes",
    path: "/clientes",
    icon: <PeopleAltRoundedIcon />,
  },
  {
    label: "Proveedores",
    path: "/proveedores",
    icon: <LocalShippingRoundedIcon />,
  },
  {
    label: "Ventas",
    path: "/ventas",
    icon: <ReceiptLongRoundedIcon />,
  },
];

/**
 * Accesos directos a los módulos principales del sistema.
 */
function QuickActions() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        component="h2"
        sx={{
          mb: 2,
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "#333333",
        }}
      >
        Accesos rápidos
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 1.5,
        }}
      >
        {acciones.map((accion) => (
          <Card
            key={accion.label}
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #EEEEEE",
              backgroundColor: "#FFFFFF",
            }}
          >
            <CardActionArea
              onClick={() => navigate(accion.path)}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  borderRadius: "12px",
                  backgroundColor: "#E8F5E9",
                  color: "#2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {accion.icon}
              </Box>

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#333333",
                }}
              >
                {accion.label}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default QuickActions;