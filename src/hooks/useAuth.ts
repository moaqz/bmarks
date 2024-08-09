import { useContext } from "react";
import type { AuthHook } from "~/contexts/auth-provider";
import { AuthContext } from "~/contexts/auth-provider";

export function useAuth(): AuthHook {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
