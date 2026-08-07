import {
  ArrowBackRounded,
  PaymentsOutlined,
  PhoneOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovimientoClienteCard from "./components/MovimientoClienteCard";
import MovimientoClienteDialog from "./components/MovimientoClienteDialog";

import {
  obtenerClientePorId,
  type Cliente,
} from "../../services/clienteService";


interface MovimientoCliente {
  id: number;
  clienteId: number;
  tipo: "deuda" | "cobro";
  fecha: string;
  monto: number;
  descripcion: string;
}


const movimientosSimulados: MovimientoCliente[] = [
  {
    id: 1,
    clienteId: 1,
    tipo: "deuda",
    fecha: "29/07/2026",
    monto: 60000,
    descripcion: "Venta fiada",
  },
  {
    id: 2,
    clienteId: 1,
    tipo: "cobro",
    fecha: "28/07/2026",
    monto: 15000,
    descripcion: "Cobro en efectivo",
  },
];


function ClienteDetallePage() {

  const { id } = useParams();


  const [cliente, setCliente] =
    useState<Cliente | null>(null);

  const [cargando, setCargando] =
    useState(true);


  const [dialogoMovimiento, setDialogoMovimiento] =
    useState<"deuda" | "cobro" | null>(null);


  const [guardandoMovimiento, setGuardandoMovimiento] =
    useState(false);



  useEffect(() => {

    const cargarCliente = async () => {

      try {

        if (!id) return;

        const data =
          await obtenerClientePorId(Number(id));

        setCliente(data);

      } catch (error) {

        console.error(
          "Error obteniendo cliente:",
          error
        );

      } finally {

        setCargando(false);

      }

    };


    cargarCliente();

  }, [id]);



  const handleGuardarMovimiento = (data: {
    monto: number;
    fecha: string;
    observaciones: string;
  }) => {


    if (!cliente || !dialogoMovimiento) {
      return;
    }


    setGuardandoMovimiento(true);


    console.log(
      "Movimiento:",
      {
        clienteId: cliente.id,
        tipo: dialogoMovimiento,
        ...data,
      }
    );


    setTimeout(() => {

      setGuardandoMovimiento(false);
      setDialogoMovimiento(null);

    }, 600);

  };



  if (cargando) {

    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography>
          Cargando cliente...
        </Typography>
      </Box>
    );

  }



  if (!cliente) {

    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Cliente no encontrado
        </Typography>
      </Box>
    );

  }



  const movimientosCliente =
    movimientosSimulados.filter(
      (movimiento) =>
        movimiento.clienteId === cliente.id
    );



  const iniciales =
    cliente.nombre
      .split(" ")
      .filter(Boolean)
      .map((palabra) => palabra[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();



  const saldoFormateado =
    cliente.saldoPendiente.toLocaleString(
      "es-AR",
      {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }
    );



  const tieneDeuda =
    cliente.saldoPendiente > 0;



  return (

    <Box sx={{ pb: 10 }}>


      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >

        <Button
          onClick={() => window.history.back()}
          sx={{
            minWidth: 40,
            width: 40,
            height: 40,
            p: 0,
            borderRadius: "10px",
            border:
              "1px solid #DDDDDD",
            backgroundColor:
              "#FFFFFF",
            color:
              "#333333",
          }}
        >
          <ArrowBackRounded />
        </Button>


        <Typography
          component="h1"
          sx={{
            fontSize: "1.35rem",
            fontWeight: 700,
          }}
        >
          Detalle del cliente
        </Typography>


      </Box>



      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border:
            "1px solid #DDDDDD",
        }}
      >

        <CardContent>


          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >


            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor:
                  "#E8F5E9",
                color:
                  "#2E7D32",
                fontWeight: 700,
              }}
            >
              {iniciales}
            </Avatar>


            <Box>

              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                {cliente.nombre}
              </Typography>


              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >

                <PhoneOutlined
                  sx={{
                    fontSize: 16,
                    color:
                      "text.secondary",
                  }}
                />


                <Typography
                  sx={{
                    fontSize:
                      ".85rem",
                    color:
                      "text.secondary",
                  }}
                >
                  {cliente.telefono}
                </Typography>


              </Box>


            </Box>


          </Box>



          <Divider sx={{ my: 2 }}/>



          <Typography
            sx={{
              fontSize:
                ".8rem",
              color:
                "text.secondary",
            }}
          >
            Deuda del cliente
          </Typography>


          <Typography
            sx={{
              fontSize:
                "1.6rem",
              fontWeight:
                800,
              color:
                tieneDeuda
                  ? "#D32F2F"
                  : "#2E7D32",
            }}
          >
            {tieneDeuda
              ? saldoFormateado
              : "Sin deuda"}
          </Typography>


        </CardContent>


      </Card>



      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 1.25,
          mt: 1.5,
        }}
      >

        <Button
          variant="outlined"
          startIcon={<ReceiptLongOutlined />}
          onClick={() =>
            setDialogoMovimiento("deuda")
          }
        >
          Registrar deuda
        </Button>


        <Button
          variant="outlined"
          startIcon={<PaymentsOutlined />}
          onClick={() =>
            setDialogoMovimiento("cobro")
          }
        >
          Registrar cobro
        </Button>


      </Box>



      <Box sx={{ mt: 2 }}>


        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Movimientos recientes
        </Typography>



        <Box
          sx={{
            display: "flex",
            flexDirection:
              "column",
            gap: 1,
            mt: 1,
          }}
        >

          {movimientosCliente.map(
            (movimiento) => (

              <MovimientoClienteCard
                key={movimiento.id}
                tipo={movimiento.tipo}
                fecha={movimiento.fecha}
                monto={movimiento.monto}
                descripcion={
                  movimiento.descripcion
                }
              />

            )
          )}


        </Box>


      </Box>



      <MovimientoClienteDialog
        open={
          dialogoMovimiento !== null
        }
        tipo={
          dialogoMovimiento ?? "deuda"
        }
        loading={
          guardandoMovimiento
        }
        onClose={() => {

          if (!guardandoMovimiento) {
            setDialogoMovimiento(null);
          }

        }}
        onSubmit={
          handleGuardarMovimiento
        }
      />


    </Box>

  );

}


export default ClienteDetallePage;