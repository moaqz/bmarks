import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";

export function AuthenticatedLayout() {
  const { user } = useAuth();
  return !user
    ? <Navigate to="/login" />
    : <Outlet />;
}
