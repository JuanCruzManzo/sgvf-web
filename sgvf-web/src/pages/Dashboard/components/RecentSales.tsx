import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const ventasRecientes = [
  {
    id: 1,
    cliente: "Mercado Central",
    detalle: "5 cajones de tomate",
    total: "$85.000",
    hora: "10:35",
  },
  {
    id: 2,
    cliente: "Verdulería El Sol",
    detalle: "3 cajones de papa",
    total: "$48.000",
    hora: "09:50",
  },
  {
    id: 3,
    cliente: "Cliente mostrador",
    detalle: "2 cajones de choclo",
    total: "$31.500",
    hora: "08:40",
  },
];

/**
 * Muestra las ventas más recientes dentro de una sección desplegable.
 *
 * Actualmente utiliza datos simulados.
 * Más adelante se reemplazarán por información proveniente de la API.
 */
function RecentSales() {
  const [expandido, setExpandido] = useState(false);

  return (
    <Accordion
      expanded={expandido}
      onChange={(_, nuevoEstado) => setExpandido(nuevoEstado)}
      disableGutters
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: "16px !important",
        border: "1px solid #EEEEEE",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        "&::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
        sx={{
          minHeight: 56,
          px: 2,
          "& .MuiAccordionSummary-content": {
            my: 1.5,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            Últimas ventas
          </Typography>

          {!expandido && (
            <Typography
              sx={{
                fontSize: "0.82rem",
                color: "text.secondary",
              }}
            >
              Ver movimientos
            </Typography>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2, pt: 0, pb: 1 }}>
        {ventasRecientes.map((venta, index) => (
          <Box key={venta.id}>
            <Box
              sx={{
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  backgroundColor: "#E8F5E9",
                  color: "#2E7D32",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                }}
              >
                {venta.cliente.charAt(0)}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#333333",
                  }}
                >
                  {venta.cliente}
                </Typography>

                <Typography
                  noWrap
                  sx={{
                    mt: 0.15,
                    fontSize: "0.76rem",
                    color: "text.secondary",
                  }}
                >
                  {venta.detalle} · {venta.hora}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#2E7D32",
                }}
              >
                {venta.total}
              </Typography>
            </Box>

            {index < ventasRecientes.length - 1 && <Divider />}
          </Box>
        ))}

        <Typography
          sx={{
            py: 1.25,
            textAlign: "center",
            color: "#2E7D32",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          Ver todas las ventas
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default RecentSales;