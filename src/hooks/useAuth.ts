import { useContext } from "react";
import type { AuthHook } from "~/contexts/auth-context";
import { AuthContext } from "~/contexts/auth-context";

export function useAuth(): AuthHook {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
