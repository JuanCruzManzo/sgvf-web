import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChevronRightRounded,
  DeleteOutlined,
  EditOutlined,
  LocalShippingOutlined,
  PhoneOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";

interface ProveedorCardProps {
  nombre: string;
  telefono: string;
  saldoPendiente: number;
  onVerMovimientos?: () => void;
  onEditar?: () => void;
  onEliminar?: () => void;
}

function ProveedorCard({
  nombre,
  telefono,
  saldoPendiente,
  onVerMovimientos,
  onEditar,
  onEliminar,
}: ProveedorCardProps) {
  const iniciales = nombre
    .split(" ")
    .filter(Boolean)
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tieneDeuda = saldoPendiente > 0;

  const saldoFormateado = saldoPendiente.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: "1px solid #DDDDDD",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 1.75,
          "&:last-child": {
            pb: 1.25,
          },
        }}
      >
        {/* Información principal */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "42px minmax(0, 1fr) auto",
            columnGap: 2,
            rowGap: 0.4,
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <Avatar
            sx={{
              gridColumn: 1,
              gridRow: "1 / span 3",
              width: 42,
              height: 42,
              alignSelf: "start",
              mt: 0.15,
              bgcolor: "#4CAF50",
              color: "success.dark",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            {iniciales || <LocalShippingOutlined />}
          </Avatar>

          {/* Nombre */}
          <Typography
            noWrap
            sx={{
              gridColumn: 2,
              gridRow: 1,
              justifySelf: "start",
              width: "100%",
              textAlign: "left",
              fontSize: "0.98rem",
              fontWeight: 700,
              color: "#333333",
            }}
          >
            {nombre}
          </Typography>

          {/* Editar y eliminar */}
          <Stack
            direction="row"
            spacing={0.45}
            sx={{
              gridColumn: 3,
              gridRow: "1 / span 2",
              justifySelf: "end",
              alignSelf: "center",
            }}
          >
            <IconButton
                size="small"
                aria-label={`Editar proveedor ${nombre}`}
                onClick={onEditar}
                sx={{
                    width: 32,
                    height: 32,
                    border: "1px solid #BDBDBD",
                    borderRadius: "8px",
                    color: "#616161",
                    backgroundColor: "#F7F7F7",

                    "&:hover": {
                    backgroundColor: "#EEEEEE",
                    borderColor: "#9E9E9E",
                    },

                    "&:active": {
                    backgroundColor: "#F7F7F7",
                    },
                }}
                >
                <EditOutlined fontSize="small" />
                </IconButton>

                <IconButton
                size="small"
                aria-label={`Eliminar proveedor ${nombre}`}
                onClick={onEliminar}
                sx={{
                    width: 32,
                    height: 32,
                    border: "1px solid #EF9A9A",
                    borderRadius: "8px",
                    color: "#E53935",
                    backgroundColor: "#FFF5F5",

                    "&:hover": {
                    backgroundColor: "#FFEBEE",
                    borderColor: "#E53935",
                    },

                    "&:active": {
                    backgroundColor: "#FFF5F5",
                    },
                }}
                >
                <DeleteOutlined fontSize="small" />
                </IconButton>
          </Stack>

          {/* Teléfono */}
          <Box
            sx={{
              gridColumn: 2,
              gridRow: 2,
              justifySelf: "start",
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              minWidth: 0,
            }}
          >
            <PhoneOutlined
              sx={{
                flexShrink: 0,
                fontSize: "0.9rem",
                color: "text.secondary",
              }}
            />

            <Typography
              noWrap
              sx={{
                fontSize: "0.8rem",
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              {telefono}
            </Typography>
          </Box>

          {/* Saldo */}
          <Box
            sx={{
              gridColumn: "2 / span 2",
              gridRow: 3,
              display: "flex",
              alignItems: "baseline",
              flexWrap: "wrap",
              columnGap: 0.5,
              mt: 0.65,
            }}
          >
        
            <Typography
              component="span"
              sx={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: tieneDeuda ? "#D32F2F" : "#2E7D32",
              }}
            >
              {tieneDeuda
                ? `Saldo pendiente: ${saldoFormateado}`
                : "Sin deuda pendiente"}
            </Typography>
          </Box>
        </Box>

        {/* Acceso al detalle y movimientos */}
        <Box
          component="button"
          type="button"
          onClick={onVerMovimientos}
          aria-label={`Ver movimientos de ${nombre}`}
          sx={{
            width: "100%",
            mt: 1.2,
            pt: 1,
            px: 0.25,
            pb: 0,
            border: 0,
            borderTop: "1px solid #DDDDDD",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#2E7D32",
            fontFamily: "inherit",
            "&:hover": {
              opacity: 0.75,
            },
          }}
        >
          <ReceiptLongOutlined
            sx={{
              mr: 0.75,
              fontSize: "1.05rem",
            }}
          />

          <Typography
            sx={{
              flex: 1,
              textAlign: "left",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            Ver movimientos
          </Typography>

          <ChevronRightRounded
            sx={{
              fontSize: "1.15rem",
              color: "text.secondary",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProveedorCard;