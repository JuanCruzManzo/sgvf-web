import {
  Alert,
  Snackbar,
  type AlertColor,
} from "@mui/material";

interface AppSnackbarProps {
  open: boolean;
  mensaje: string;
  tipo?: AlertColor;
  onClose: () => void;
}

function AppSnackbar({
  open,
  mensaje,
  tipo = "error",
  onClose,
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={onClose}
        severity={tipo}
        variant="filled"
        sx={{
          width: "100%",
          borderRadius: "12px",
          fontWeight: 600,
        }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;