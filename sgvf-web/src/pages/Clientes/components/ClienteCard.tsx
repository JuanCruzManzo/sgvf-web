import {
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

interface ClienteCardProps {
  nombre: string;
  telefono: string;
}

function ClienteCard({
  nombre,
  telefono,
}: ClienteCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
          >
            {nombre}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <PhoneOutlinedIcon
              fontSize="small"
              color="action"
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {telefono}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ClienteCard;