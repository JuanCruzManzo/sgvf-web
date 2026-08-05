import {
  AddShoppingCartOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

interface ProductoDisponible {
  id: number;
  nombre: string;
  stock: number;
}

interface ProductoVentaValues {
  productoId: number;
  cantidadCajones: number;
  precioUnitario: number;
}

interface AgregarProductoVentaDialogProps {
  open: boolean;
  productos: ProductoDisponible[];
  initialValues?: ProductoVentaValues;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: ProductoVentaValues) => void;
}

function AgregarProductoVentaDialog({
  open,
  productos,
  initialValues,
  loading = false,
  onClose,
  onSubmit,
}: AgregarProductoVentaDialogProps) {
  const esEdicion = Boolean(initialValues);

  const [productoId, setProductoId] = useState("");
  const [cantidadCajones, setCantidadCajones] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");

  const [errores, setErrores] = useState({
    productoId: "",
    cantidadCajones: "",
    precioUnitario: "",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    setProductoId(
      initialValues?.productoId
        ? initialValues.productoId.toString()
        : ""
    );

    setCantidadCajones(
      initialValues?.cantidadCajones
        ? initialValues.cantidadCajones.toString()
        : ""
    );

    setPrecioUnitario(
      initialValues?.precioUnitario
        ? initialValues.precioUnitario.toString()
        : ""
    );

    setErrores({
      productoId: "",
      cantidadCajones: "",
      precioUnitario: "",
    });
  }, [open, initialValues]);

  const productoSeleccionado = useMemo(
    () =>
      productos.find(
        (producto) => producto.id === Number(productoId)
      ),
    [productoId, productos]
  );

  const subtotal = useMemo(() => {
    const cantidad = Number(cantidadCajones);
    const precio = Number(precioUnitario);

    if (cantidad <= 0 || precio <= 0) {
      return 0;
    }

    return cantidad * precio;
  }, [cantidadCajones, precioUnitario]);

  const subtotalFormateado = subtotal.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const handleSubmit = () => {
    const productoIdNumerico = Number(productoId);
    const cantidadNumerica = Number(cantidadCajones);
    const precioNumerico = Number(precioUnitario);

    const nuevosErrores = {
      productoId: productoId
        ? ""
        : "Seleccioná un producto.",

      cantidadCajones:
        !cantidadCajones ||
        !Number.isInteger(cantidadNumerica) ||
        cantidadNumerica <= 0
          ? "Ingresá una cantidad válida."
          : productoSeleccionado &&
              cantidadNumerica > productoSeleccionado.stock
            ? `Stock disponible: ${productoSeleccionado.stock} cajones.`
            : "",

      precioUnitario:
        !precioUnitario || precioNumerico <= 0
          ? "Ingresá un precio mayor que cero."
          : "",
    };

    setErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(Boolean)) {
      return;
    }

    onSubmit({
      productoId: productoIdNumerico,
      cantidadCajones: cantidadNumerica,
      precioUnitario: precioNumerico,
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
      {/* Encabezado */}
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
            backgroundColor: "#E8F5E9",
            color: "#2E7D32",
          }}
        >
          {esEdicion ? (
            <EditOutlined sx={{ fontSize: 30 }} />
          ) : (
            <AddShoppingCartOutlined sx={{ fontSize: 30 }} />
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
          {esEdicion
            ? "Editar producto"
            : "Agregar producto"}
        </Typography>
      </Box>

      {/* Formulario */}
      <DialogContent sx={{ px: 3, pt: 2.5 }}>
        <Stack spacing={2}>
          <TextField
            select
            label="Producto"
            value={productoId}
            onChange={(event) => {
              setProductoId(event.target.value);

              if (errores.productoId) {
                setErrores((estadoAnterior) => ({
                  ...estadoAnterior,
                  productoId: "",
                }));
              }
            }}
            error={Boolean(errores.productoId)}
            helperText={
              errores.productoId ||
              (productoSeleccionado
                ? `Stock disponible: ${productoSeleccionado.stock} cajones`
                : "")
            }
            fullWidth
            disabled={esEdicion}
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
          >
            {productos.map((producto) => (
              <MenuItem
                key={producto.id}
                value={producto.id}
                disabled={producto.stock === 0}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <span>{producto.nombre}</span>

                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.76rem",
                      color:
                        producto.stock === 0
                          ? "error.main"
                          : "text.secondary",
                    }}
                  >
                    {producto.stock === 0
                      ? "Sin stock"
                      : `${producto.stock} cajones`}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
            }}
          >
            <TextField
              label="Cantidad"
              type="number"
              value={cantidadCajones}
              onChange={(event) => {
                setCantidadCajones(event.target.value);

                if (errores.cantidadCajones) {
                  setErrores((estadoAnterior) => ({
                    ...estadoAnterior,
                    cantidadCajones: "",
                  }));
                }
              }}
              error={Boolean(errores.cantidadCajones)}
              helperText={errores.cantidadCajones}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  min: 1,
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
              label="Precio por cajón"
              type="number"
              value={precioUnitario}
              onChange={(event) => {
                setPrecioUnitario(event.target.value);

                if (errores.precioUnitario) {
                  setErrores((estadoAnterior) => ({
                    ...estadoAnterior,
                    precioUnitario: "",
                  }));
                }
              }}
              error={Boolean(errores.precioUnitario)}
              helperText={errores.precioUnitario}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  min: 1,
                  inputMode: "decimal",
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

          {/* Vista previa del subtotal */}
          <Box
            sx={{
              p: 1.5,
              borderRadius: "12px",
              border: "1px solid #DDEBDD",
              backgroundColor: "#F6FBF6",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.84rem",
                color: "text.secondary",
              }}
            >
              Subtotal
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: 800,
                color: "#2E7D32",
              }}
            >
              {subtotalFormateado}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      {/* Acciones */}
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
          {loading
            ? "Guardando..."
            : esEdicion
              ? "Guardar cambios"
              : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AgregarProductoVentaDialog;