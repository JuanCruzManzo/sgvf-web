import { Navigate, Outlet } from "react-router-dom";

/**
 * Protege las rutas internas del sistema.
 *
 * Si no existe un token guardado, redirige al login.
 * Si existe, permite mostrar la ruta solicitada.
 */
function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;