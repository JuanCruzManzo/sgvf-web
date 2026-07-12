import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  backgroundColor?: string;
  iconColor?: string;
}

/**
 * Tarjeta reutilizable para mostrar indicadores breves
 * dentro del resumen del Dashboard.
 */
function SummaryCard({
  title,
  value,
  icon,
  backgroundColor = "#F1F8F2",
  iconColor = "#2E7D32",
}: SummaryCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "16px",
        backgroundColor,
        border: "1px solid rgba(0, 0, 0, 0.04)",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          mb: 1.5,
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#333333",
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 0.25,
          fontSize: "0.85rem",
          color: "text.secondary",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
}

export default SummaryCard;