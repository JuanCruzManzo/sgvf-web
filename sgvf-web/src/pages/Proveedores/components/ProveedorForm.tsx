import { SaveOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface ProveedorFormValues {
  nombre: string;
  telefono: string;
}

interface ProveedorFormProps {
  initialValues?: ProveedorFormValues;
  submitLabel: string;
  onSubmit: (values: ProveedorFormValues) => void;
  loading?: boolean;
}

function ProveedorForm({
  initialValues = {
    nombre: "",
    telefono: "",
  },
  submitLabel,
  onSubmit,
  loading = false,
}: ProveedorFormProps) {
  const [nombre, setNombre] = useState(initialValues.nombre);
  const [telefono, setTelefono] = useState(initialValues.telefono);

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
  });

  const validarFormulario = () => {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
    };

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Ingresá el nombre del proveedor.";
    }

    if (!telefono.trim()) {
      nuevosErrores.telefono = "Ingresá el teléfono del proveedor.";
    }

    setErrores(nuevosErrores);

    return !nuevosErrores.nombre && !nuevosErrores.telefono;
  };

  const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!validarFormulario()) {
    return;
  }

  onSubmit({
    nombre: nombre.trim(),
    telefono: telefono.trim(),
  });
};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          placeholder="Ej: Distribuidora Norte"
          value={nombre}
          onChange={(event) => {
            setNombre(event.target.value);

            if (errores.nombre) {
              setErrores((prev) => ({
                ...prev,
                nombre: "",
              }));
            }
          }}
          error={Boolean(errores.nombre)}
          helperText={errores.nombre}
          fullWidth
          autoFocus
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
          label="Teléfono"
          placeholder="Ej: 223 555-1234"
          value={telefono}
          onChange={(event) => {
            setTelefono(event.target.value);

            if (errores.telefono) {
              setErrores((prev) => ({
                ...prev,
                telefono: "",
              }));
            }
          }}
          error={Boolean(errores.telefono)}
          helperText={errores.telefono}
          fullWidth
          type="tel"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              inputMode: "tel",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<SaveOutlined />}
          disabled={loading}
          fullWidth
          sx={{
            minHeight: 48,
            mt: 0.5,
            borderRadius: "12px",
            backgroundColor: "#4CAF50",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#43A047",
              boxShadow: "none",
            },
          }}
        >
          {loading ? "Guardando..." : submitLabel}
        </Button>
      </Stack>
    </Box>
  );
}

export default ProveedorForm;