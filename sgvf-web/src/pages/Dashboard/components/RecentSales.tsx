import { useEffect, useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";

import {
  obtenerVentas,
  type Venta,
} from "../../../services/ventaService";

function RecentSales() {
  const navigate = useNavigate();

  const [expandido, setExpandido] = useState(false);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    const cargarVentas = async () => {
      try {
        setCargando(true);
        setErrorCarga(false);

        const data = await obtenerVentas();

        setVentas(data);
      } catch (error) {
        console.error("Error al cargar ventas recientes:", error);
        setErrorCarga(true);
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, []);

  const ventasRecientes = useMemo(() => {
    return [...ventas]
      .sort(
        (a, b) =>
          new Date(b.fecha).getTime() -
          new Date(a.fecha).getTime()
      )
      .slice(0, 3);
  }, [ventas]);

  const formatearMonto = (monto: number) =>
    monto.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

  const formatearHora = (fecha: string) =>
    new Date(fecha).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const obtenerDetalle = (venta: Venta) => {
    const cantidadCajones = venta.detalles.reduce(
      (total, detalle) =>
        total + detalle.cantidadCajones,
      0
    );

    if (venta.detalles.length === 1) {
      return `${cantidadCajones} cajones de ${venta.detalles[0].producto}`;
    }

    return `${cantidadCajones} cajones · ${venta.detalles.length} productos`;
  };

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
        {cargando && (
          <Typography
            sx={{
              py: 2,
              textAlign: "center",
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            Cargando ventas...
          </Typography>
        )}

        {!cargando && errorCarga && (
          <Typography
            sx={{
              py: 2,
              textAlign: "center",
              fontSize: "0.82rem",
              color: "text.secondary",
            }}
          >
            No pudimos cargar las ventas.
          </Typography>
        )}

        {!cargando &&
          !errorCarga &&
          ventasRecientes.length === 0 && (
            <Typography
              sx={{
                py: 2,
                textAlign: "center",
                fontSize: "0.82rem",
                color: "text.secondary",
              }}
            >
              Todavía no hay ventas registradas.
            </Typography>
          )}

        {!cargando &&
          !errorCarga &&
          ventasRecientes.map((venta, index) => (
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
                  {venta.cliente.charAt(0).toUpperCase()}
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
                    {obtenerDetalle(venta)} ·{" "}
                    {formatearHora(venta.fecha)}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#2E7D32",
                  }}
                >
                  {formatearMonto(venta.total)}
                </Typography>
              </Box>

              {index < ventasRecientes.length - 1 && (
                <Divider />
              )}
            </Box>
          ))}

        {!cargando &&
          !errorCarga &&
          ventasRecientes.length > 0 && (
            <Typography
              component="button"
              onClick={() => navigate("/ventas")}
              sx={{
                width: "100%",
                py: 1.25,
                border: 0,
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "center",
                color: "#2E7D32",
                fontSize: "0.85rem",
                fontWeight: 600,
                fontFamily: "inherit",
              }}
            >
              Ver todas las ventas
            </Typography>
          )}
      </AccordionDetails>
    </Accordion>
  );
}

export default RecentSales;