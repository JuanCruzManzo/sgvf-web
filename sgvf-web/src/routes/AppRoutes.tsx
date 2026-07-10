import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductosPage from "../pages/Productos/ProductosPage";
import NuevaVentaPage from "../pages/Ventas/NuevaVentaPage";

/*Todas las rutas utilizan MainLayout para compartir la misma estructura visual (AppBar + Contenido + Navegación).*/
function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="productos" element={<ProductosPage />} />
        <Route path="ventas/nueva" element={<NuevaVentaPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;