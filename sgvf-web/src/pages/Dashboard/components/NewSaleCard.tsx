import {
  Box,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router-dom";

/**
 * Acción principal del Dashboard.
 * Redirige al formulario para registrar una nueva venta.
 */
function NewSaleCard() {
  const navigate = useNavigate();

  const irANuevaVenta = () => {
    navigate("/ventas/nueva");
  };

  return (
    <Card
      elevation={0}
      sx={{
        mb: 4,
        overflow: "hidden",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)",
        color: "#FFFFFF",
      }}
    >
      <CardActionArea
        onClick={irANuevaVenta}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          minHeight: 108,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShoppingCartRoundedIcon sx={{ fontSize: 30 }} />
          </Box>

          <Box>
            <Typography
              component="h2"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
              }}
            >
              Nueva venta
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: "0.88rem",
                color: "rgba(255, 255, 255, 0.85)",
              }}
            >
              Registrar una venta rápida
            </Typography>
          </Box>
        </Box>

        <ArrowForwardIosRoundedIcon sx={{ fontSize: 22 }} />
      </CardActionArea>
    </Card>
  );
}

export default NewSaleCard;