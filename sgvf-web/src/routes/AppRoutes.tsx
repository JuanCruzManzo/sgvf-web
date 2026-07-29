import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductosPage from "../pages/Productos/ProductosPage";
import NuevaVentaPage from "../pages/Ventas/NuevaVentaPage";
import ClientesPage from "../pages/Clientes/ClientesPage";
import ProveedoresPage from "../pages/Proveedores/ProveedoresPage";
import VentasPage from "../pages/Ventas/VentasPage";
import EstadisticasPage from "../pages/Estadisticas/EstadisticasPage";
import ProveedorDetallePage from "../pages/Proveedores/ProveedorDetallePage";
import ClienteDetallePage from "../pages/Clientes/ClienteDetallePage";
import NuevoProveedorPage from "../pages/Proveedores/NuevoProveedorPage";
import EditarProveedorPage from "../pages/Proveedores/EditarProveedorPage";

/**
 * Centraliza las rutas principales del sistema.
 *
 * El Login se encuentra fuera de MainLayout porque debe mostrarse
 * sin las barras de navegación de las pantallas internas.
 *
 * Las rutas internas están protegidas y requieren un token.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="productos" element={<ProductosPage />} />
          <Route path="ventas" element={<VentasPage />} />
          <Route path="ventas/nueva" element={<NuevaVentaPage />} />
          <Route path="clientes" element={<ClientesPage />} />
          <Route path="proveedores" element={<ProveedoresPage />} />
          <Route path="estadisticas" element={<EstadisticasPage />} />
          <Route path="/proveedores" element={<ProveedoresPage />} />
          <Route path="/proveedores/:id" element={<ProveedorDetallePage />} />
          <Route path="/clientes/:id" element={<ClienteDetallePage />} />
          <Route path="/proveedores/nuevo" element={<NuevoProveedorPage />}/>
          <Route path="/proveedores/:id/editar" element={<EditarProveedorPage />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;