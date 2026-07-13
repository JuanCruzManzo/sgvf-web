import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material";

function TopBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#333333",
        borderBottom: "1px solid #eeeeee",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 72 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2E7D32", lineHeight: 1.2 }}
          >
            El Pariente
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Gestión frutihortícola
          </Typography>
        </Box>

        <Avatar
          sx={{
            backgroundColor: "#E8F5E9",
            color: "#2E7D32",
            fontWeight: 700,
          }}
        >
          JR
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;