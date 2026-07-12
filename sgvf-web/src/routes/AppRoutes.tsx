import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductosPage from "../pages/Productos/ProductosPage";
import NuevaVentaPage from "../pages/Ventas/NuevaVentaPage";
import ClientesPage from "../pages/Clientes/ClientesPage";
import ProveedoresPage from "../pages/Proveedores/ProveedoresPage";
import VentasPage from "../pages/Ventas/VentasPage";

/**
 * Centraliza las rutas principales del sistema.
 *
 * El Login se encuentra fuera de MainLayout porque debe mostrarse
 * sin las barras de navegación de las pantallas internas.
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="productos" element={<ProductosPage />} />
        <Route path="ventas" element={<VentasPage />} />
        <Route path="ventas/nueva" element={<NuevaVentaPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="proveedores" element={<ProveedoresPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;