import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../components/navigation/TopBar";
import BottomNav from "../components/navigation/BottomNav";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
      }}
    >
      <TopBar />

      <Container
        maxWidth="sm"
        component="main"
        sx={{
          py: 3,
          pb: 11,
        }}
      >
        <Outlet />
      </Container>

      <BottomNav />
    </Box>
  );
}

export default MainLayout;