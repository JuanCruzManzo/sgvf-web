import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AccountCircleOutlined,
  LogoutRounded,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

interface UserMenuProps {
  nombre?: string;
  rol?: string;
  iniciales?: string;
}

function UserMenu({
  nombre = "Juan Rodríguez",
  rol = "Administrador",
  iniciales = "JR",
}: UserMenuProps) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const menuAbierto = Boolean(anchorEl);

  const abrirMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const cerrarMenu = () => {
    setAnchorEl(null);
  };

  const cerrarSesion = () => {
    cerrarMenu();

    localStorage.removeItem("token");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      {/* Avatar que abre el menú */}
      <IconButton
        aria-label="Abrir menú de usuario"
        aria-controls={menuAbierto ? "menu-usuario" : undefined}
        aria-haspopup="true"
        aria-expanded={menuAbierto ? "true" : undefined}
        onClick={abrirMenu}
        sx={{
          p: 0.25,
          borderRadius: "50%",
          border: "2px solid transparent",

          "&:hover": {
            backgroundColor: "#F1F8F2",
            borderColor: "#C8E6C9",
          },

          "&:focus-visible": {
            borderColor: "#2E7D32",
          },
        }}
      >
        <Avatar
          sx={{
            width: 42,
            height: 42,
            backgroundColor: "#E8F5E9",
            color: "#2E7D32",
            fontSize: "1.05rem",
            fontWeight: 700,
          }}
        >
          {iniciales}
        </Avatar>
      </IconButton>

      {/* Menú desplegable */}
      <Menu
        id="menu-usuario"
        anchorEl={anchorEl}
        open={menuAbierto}
        onClose={cerrarMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              mt: 1,
              borderRadius: "16px",
              border: "1px solid #E0E0E0",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
              overflow: "hidden",
            },
          },
          list: {
            sx: {
              py: 1,
            },
          },
        }}
      >
        {/* Información del usuario */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
              backgroundColor: "#E8F5E9",
              color: "#2E7D32",
              fontWeight: 700,
            }}
          >
            {iniciales}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              noWrap
              sx={{
                fontSize: "0.92rem",
                fontWeight: 700,
                color: "#333333",
              }}
            >
              {nombre}
            </Typography>

            <Typography
              sx={{
                mt: 0.15,
                fontSize: "0.76rem",
                color: "text.secondary",
              }}
            >
              {rol}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Acciones futuras */}
        <MenuItem
            disabled
            sx={{
                minHeight: 46,
                mx: 1,
                mt: 0.75,
                borderRadius: "10px",
                fontSize: "0.88rem",
            }}
            >
            <ListItemIcon>
                <AccountCircleOutlined fontSize="small" />
            </ListItemIcon>

            Mi perfil
        </MenuItem>

        <Divider sx={{ my: 0.75 }} />

        {/* Cierre de sesión */}
        <MenuItem
          onClick={cerrarSesion}
          sx={{
            minHeight: 46,
            mx: 1,
            mb: 0.25,
            borderRadius: "10px",
            color: "#D32F2F",
            fontSize: "0.88rem",
            fontWeight: 700,

            "&:hover": {
              backgroundColor: "#FFEBEE",
            },
          }}
        >
          <ListItemIcon>
            <LogoutRounded
              fontSize="small"
              sx={{ color: "#D32F2F" }}
            />
          </ListItemIcon>

          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;