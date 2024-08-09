import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";

export function GuestLayout() {
  const { user } = useAuth();
  return !user
    ? <Outlet />
    : <Navigate to="/bookmarks" />;
}
