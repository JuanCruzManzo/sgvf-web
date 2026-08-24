import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../components/navigation/TopBar";
import BottomNav from "../components/navigation/BottomNav";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        backgroundColor: "#F8F9FA",
      }}
    >
      <TopBar />

      <Container
        maxWidth="sm"
        component="main"
        sx={{
          py: 2,
          pb: 11,

          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <Outlet />
      </Container>

      <BottomNav />
    </Box>
  );
}

export default MainLayout;