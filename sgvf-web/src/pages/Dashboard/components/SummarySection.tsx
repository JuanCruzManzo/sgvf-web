import { Box, Typography } from "@mui/material";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import SummaryCard from "./SummaryCard";

/**
 * Muestra indicadores rápidos del día.
 *
 * Los valores de ahora son demostrativos, van a ser reemplazados
 * por datos de la API.
 */
function SummarySection() {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        component="h2"
        sx={{
          mb: 1.25,
          fontSize: "1.05rem",
          fontWeight: 700,
          color: "#333333",
        }}
      >
        Resumen de hoy
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 1,
        }}
      >
        <SummaryCard
          title="Ventas realizadas"
          value="8"
          icon={<ShoppingBagRoundedIcon />}
        />

        <SummaryCard
          title="Total vendido"
          value="$320.000"
          icon={<AttachMoneyRoundedIcon />}
        />

        <SummaryCard
          title="Stock bajo"
          value="3"
          icon={<InventoryRoundedIcon />}
          backgroundColor="#FFF8E8"
          iconColor="#ED8A00"
        />

        <SummaryCard
          title="Deudas pendientes"
          value="2"
          icon={<AccountBalanceWalletRoundedIcon />}
          backgroundColor="#FFF1F1"
          iconColor="#D64545"
        />
      </Box>
    </Box>
  );
}

export default SummarySection;