import { SaveOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface ProductoFormValues {
  nombre: string;
  descripcion: string;
  stock: number;
  stockMinimo: number;
}

interface ProductoFormProps {
  initialValues?: ProductoFormValues;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: ProductoFormValues) => void;
}

function ProductoForm({
  initialValues = {
    nombre: "",
    descripcion: "",
    stock: 0,
    stockMinimo: 0,
  },
  submitLabel,
  loading = false,
  onSubmit,
}: ProductoFormProps) {
  const [nombre, setNombre] = useState(initialValues.nombre);
  const [descripcion, setDescripcion] = useState(
    initialValues.descripcion
  );
  const [stock, setStock] = useState(
    initialValues.stock.toString()
  );
  const [stockMinimo, setStockMinimo] = useState(
    initialValues.stockMinimo.toString()
  );

  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    stock: "",
    stockMinimo: "",
  });

  const validarFormulario = () => {
    const stockNumerico = Number(stock);
    const stockMinimoNumerico = Number(stockMinimo);

    const nuevosErrores = {
      nombre: nombre.trim()
        ? ""
        : "Ingresá el nombre del producto.",

      descripcion: descripcion.trim()
        ? ""
        : "Ingresá una descripción.",

      stock:
        stock === "" ||
        !Number.isInteger(stockNumerico) ||
        stockNumerico < 0
          ? "Ingresá un stock válido, igual o mayor que cero."
          : "",

      stockMinimo:
        stockMinimo === "" ||
        !Number.isInteger(stockMinimoNumerico) ||
        stockMinimoNumerico < 0
          ? "Ingresá un stock mínimo válido."
          : "",
    };

    setErrores(nuevosErrores);

    return !Object.values(nuevosErrores).some(Boolean);
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
      descripcion: descripcion.trim(),
      stock: Number(stock),
      stockMinimo: Number(stockMinimo),
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
          placeholder="Ej: Tomate redondo"
          value={nombre}
          onChange={(event) => {
            setNombre(event.target.value);

            if (errores.nombre) {
              setErrores((estadoAnterior) => ({
                ...estadoAnterior,
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
          label="Descripción"
          placeholder="Ej: Cajón de tomate de primera"
          value={descripcion}
          onChange={(event) => {
            setDescripcion(event.target.value);

            if (errores.descripcion) {
              setErrores((estadoAnterior) => ({
                ...estadoAnterior,
                descripcion: "",
              }));
            }
          }}
          error={Boolean(errores.descripcion)}
          helperText={errores.descripcion}
          fullWidth
          multiline
          minRows={2}
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1.5,
          }}
        >
          <TextField
            label="Stock actual"
            type="number"
            value={stock}
            onChange={(event) => {
              setStock(event.target.value);

              if (errores.stock) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  stock: "",
                }));
              }
            }}
            error={Boolean(errores.stock)}
            helperText={errores.stock}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              htmlInput: {
                min: 0,
                step: 1,
                inputMode: "numeric",
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
            label="Stock mínimo"
            type="number"
            value={stockMinimo}
            onChange={(event) => {
              setStockMinimo(event.target.value);

              if (errores.stockMinimo) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  stockMinimo: "",
                }));
              }
            }}
            error={Boolean(errores.stockMinimo)}
            helperText={errores.stockMinimo}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
              htmlInput: {
                min: 0,
                step: 1,
                inputMode: "numeric",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
              },
            }}
          />
        </Box>

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

export default ProductoForm;