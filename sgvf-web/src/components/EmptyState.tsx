import { InboxOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Typography,
} from "@mui/material";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        py: 6,
        px: 3,
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{
          width: 64,
          height: 64,
          mx: "auto",
          mb: 2,
          bgcolor: "#F5F5F5",
          color: "#9E9E9E",
        }}
      >
        <InboxOutlined sx={{ fontSize: 34 }} />
      </Avatar>

      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "#333333",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: "0.88rem",
          color: "text.secondary",
        }}
      >
        {description}
      </Typography>

      {buttonText && (
        <Button
          variant="contained"
          onClick={onButtonClick}
          sx={{
            mt: 3,
            borderRadius: "12px",
            backgroundColor: "#2E7D32",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#256628",
              boxShadow: "none",
            },
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;