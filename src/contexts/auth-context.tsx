import { ID } from "appwrite";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useState } from "react";

import { SERVICES } from "~/lib/appwrite";
import type { UserModel } from "~/types/appwrite";

export const AUTH_STATES = {
  authenticated: "authenticated",
  unauthenticated: "unauthenticated",
  pending: "pending",
} as const;

export type AuthState = keyof typeof AUTH_STATES;

export interface AuthHook {
  user: UserModel | null;
  authState: AuthState;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  revalidateSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthHook | null>(null);

export function AuthProvider(props: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>(AUTH_STATES.pending);
  const [user, setUser] = useState<UserModel | null>(null);

  const revalidateSession = useCallback(async () => {
    const user = await SERVICES.account.get().catch(() => null);

    if (user) {
      setUser(user);
      setAuthState(AUTH_STATES.authenticated);
    }
    else {
      setAuthState(AUTH_STATES.unauthenticated);
    }
  }, []);

  // Will always run if the state is pending.
  useEffect(() => {
    if (authState === AUTH_STATES.pending) {
      revalidateSession();
    }
  }, [authState, revalidateSession]);

  // Will always run if the state is authenticated.
  useEffect(() => {
    if (!(authState === AUTH_STATES.authenticated)) {
      return;
    }

    const intervalId = setInterval(
      revalidateSession,
      10 * 60 * 1000, // 10 min.
    );

    return () => clearInterval(intervalId);
  }, [authState, revalidateSession]);

  const login = useCallback(async (email: string, password: string) => {
    await SERVICES
      .account
      .createEmailPasswordSession(email, password);

    setAuthState(AUTH_STATES.pending);
  }, []);

  const logout = useCallback(async () => {
    await SERVICES.account.deleteSession("current");
    setUser(null);
    setAuthState(AUTH_STATES.pending);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    await SERVICES.account.create(
      ID.unique(),
      email,
      password,
      `user${ID.unique()}`,
    );
    await login(email, password);
  }, [login]);

  return (
    <AuthContext.Provider value={{
      user,
      authState,
      logout,
      register,
      login,
      revalidateSession,
    }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
