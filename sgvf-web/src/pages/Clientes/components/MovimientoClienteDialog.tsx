import {
  PaymentsOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface MovimientoClienteData {
  monto: number;
  fecha: string;
  observaciones: string;
}

interface MovimientoClienteDialogProps {
  open: boolean;
  tipo: "deuda" | "cobro";
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: MovimientoClienteData) => void;
}

function MovimientoClienteDialog({
  open,
  tipo,
  loading = false,
  onClose,
  onSubmit,
}: MovimientoClienteDialogProps) {
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [observaciones, setObservaciones] = useState("");

  const [errores, setErrores] = useState({
    monto: "",
    fecha: "",
  });

  const esDeuda = tipo === "deuda";

  useEffect(() => {
    if (open) {
      setMonto("");
      setFecha(new Date().toISOString().split("T")[0]);
      setObservaciones("");
      setErrores({
        monto: "",
        fecha: "",
      });
    }
  }, [open]);

  const handleSubmit = () => {
    const montoNumerico = Number(monto);

    const nuevosErrores = {
      monto:
        !monto || montoNumerico <= 0
          ? "Ingresá un monto mayor que cero."
          : "",
      fecha: fecha ? "" : "Seleccioná una fecha.",
    };

    setErrores(nuevosErrores);

    if (nuevosErrores.monto || nuevosErrores.fecha) {
      return;
    }

    onSubmit({
      monto: montoNumerico,
      fecha,
      observaciones: observaciones.trim(),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
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
        }}
      >
        <Avatar
          sx={{
            width: 60,
            height: 60,
            mb: 1.5,
            backgroundColor: esDeuda ? "#FFEBEE" : "#E8F5E9",
            color: esDeuda ? "#D32F2F" : "#2E7D32",
          }}
        >
          {esDeuda ? (
            <ReceiptLongOutlined sx={{ fontSize: 30 }} />
          ) : (
            <PaymentsOutlined sx={{ fontSize: 30 }} />
          )}
        </Avatar>

        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 700,
            textAlign: "center",
            color: "#333333",
          }}
        >
          {esDeuda ? "Registrar deuda" : "Registrar cobro"}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: "0.84rem",
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          {esDeuda
            ? "Ingresá los datos de la nueva deuda del cliente."
            : "Ingresá los datos del cobro realizado al cliente."}
        </Typography>
      </Box>

      <DialogContent sx={{ px: 3, pt: 2.5 }}>
        <Stack spacing={2}>
          <TextField
            label="Monto"
            type="number"
            value={monto}
            onChange={(event) => {
              setMonto(event.target.value);

              if (errores.monto) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  monto: "",
                }));
              }
            }}
            error={Boolean(errores.monto)}
            helperText={errores.monto}
            fullWidth
            autoFocus
            slotProps={{
              htmlInput: {
                min: 0,
                inputMode: "decimal",
              },
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
              },
            }}
          />

          <TextField
            label="Fecha"
            type="date"
            value={fecha}
            onChange={(event) => {
              setFecha(event.target.value);

              if (errores.fecha) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  fecha: "",
                }));
              }
            }}
            error={Boolean(errores.fecha)}
            helperText={errores.fecha}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
              },
            }}
          />

          <TextField
            label="Observaciones"
            placeholder={
              esDeuda
                ? "Ej: Venta fiada"
                : "Ej: Cobro en efectivo"
            }
            multiline
            minRows={3}
            value={observaciones}
            onChange={(event) =>
              setObservaciones(event.target.value)
            }
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
              },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            flex: 1,
            minHeight: 44,
            borderRadius: "12px",
            borderColor: "#D5D5D5",
            color: "#555555",
            fontWeight: 700,
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="contained"
          sx={{
            flex: 1,
            minHeight: 44,
            borderRadius: "12px",
            backgroundColor: esDeuda ? "#D32F2F" : "#2E7D32",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: esDeuda ? "#C62828" : "#256628",
              boxShadow: "none",
            },
          }}
        >
          {loading
            ? "Guardando..."
            : esDeuda
              ? "Registrar deuda"
              : "Registrar cobro"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovimientoClienteDialog;