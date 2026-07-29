import { WarningAmberRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
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
            p: 0.5,
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
            width: 64,
            height: 64,
            bgcolor: "#FFEBEE",
            color: "#D32F2F",
            mb: 2,
          }}
        >
          <WarningAmberRounded sx={{ fontSize: 34 }} />
        </Avatar>

        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "text.secondary",
            textAlign: "center",
            fontSize: "0.92rem",
          }}
        >
          {description}
        </Typography>
      </Box>

      <DialogActions
        sx={{
          p: 2,
          pt: 2,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{
            flex: 1,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            borderColor: "#D5D5D5",
            color: "#555555",
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            flex: 1,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            backgroundColor: "#D32F2F",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#C62828",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Eliminando..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;