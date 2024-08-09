/* eslint-disable react/no-unstable-context-value */
import type { PropsWithChildren } from "react";
import { createContext, useEffect, useState } from "react";
import { SERVICES } from "~/lib/appwrite";

export interface AuthHook {
  // state
  user: any | null;
  isValidating: boolean;

  // actions
  updateUser: (user: any) => void;
  clear: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthHook | null>(null);

const AUTH_REVALIDATION_INTERVAL = 900000; // 15 min

export function AuthProvider(props: PropsWithChildren) {
  const [user, setUser] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const getUser = () => {
      setIsValidating(true);

      SERVICES.account.get()
        .then(user => setUser(user as any))
        .catch(() => {})
        .finally(() => setIsValidating(false));
    };

    const id = setInterval(
      getUser,
      AUTH_REVALIDATION_INTERVAL,
    );

    return () => clearInterval(id);
  }, []);

  const clear = () => {
    setUser(null);
  };

  const updateUser = (user: any) => {
    setUser(user);
  };

  const logout = () => {
    SERVICES.account.deleteSessions()
      .then(() => {
        clear();
      })
      .catch(err => console.error(err.message));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isValidating,
      updateUser,
      clear,
      logout,
    }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
