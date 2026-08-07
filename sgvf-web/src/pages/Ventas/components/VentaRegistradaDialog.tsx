import {
  CheckCircleRounded,
  PrintOutlined,
  ReceiptLongOutlined,
  ViewListOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";

interface VentaRegistradaDialogProps {
  open: boolean;
  numeroVenta: number;
  onImprimir: () => void;
  onVerDetalle: () => void;
  onVolverVentas: () => void;
}

function VentaRegistradaDialog({
  open,
  numeroVenta,
  onImprimir,
  onVerDetalle,
  onVolverVentas,
}: VentaRegistradaDialogProps) {
  const numeroFormateado = numeroVenta
    .toString()
    .padStart(4, "0");

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "18px",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          pt: 3,
          px: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            width: 64,
            height: 64,
            mb: 1.5,
            backgroundColor: "#E8F5E9",
            color: "#2E7D32",
          }}
        >
          <CheckCircleRounded sx={{ fontSize: 36 }} />
        </Avatar>

        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#333333",
          }}
        >
          Venta registrada
        </Typography>

        <Typography
          sx={{
            mt: 0.65,
            fontSize: "0.86rem",
            color: "text.secondary",
          }}
        >
          La venta #{numeroFormateado} se registró correctamente.
        </Typography>
      </Box>

      <DialogActions
        sx={{
          px: 3,
          pt: 2.5,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          startIcon={<PrintOutlined />}
          onClick={onImprimir}
          sx={{
            minHeight: 48,
            borderRadius: "12px",
            backgroundColor: "#2E7D32",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#256628",
              boxShadow: "none",
            },
          }}
        >
          Imprimir ticket
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<ReceiptLongOutlined />}
          onClick={onVerDetalle}
          sx={{
            minHeight: 46,
            borderRadius: "12px",
            borderColor: "#BDBDBD",
            color: "#555555",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Ver detalle
        </Button>

        <Button
          fullWidth
          variant="text"
          startIcon={<ViewListOutlined />}
          onClick={onVolverVentas}
          sx={{
            minHeight: 44,
            borderRadius: "12px",
            color: "text.secondary",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Volver a ventas
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VentaRegistradaDialog;