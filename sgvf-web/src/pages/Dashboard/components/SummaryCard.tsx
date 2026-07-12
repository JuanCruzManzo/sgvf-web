import { Box, Card, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  backgroundColor?: string;
  iconColor?: string;
}

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
        p: 0.7,
        borderRadius: "14px",
        backgroundColor,
        border: "1px solid rgba(0, 0, 0, 0.04)",
        minHeight: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#333333",
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: "0.78rem",
            color: "text.secondary",
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
}

export default SummaryCard;