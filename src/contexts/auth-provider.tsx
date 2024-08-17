import { ID } from "appwrite";
import type { PropsWithChildren } from "react";
import { createContext, useEffect, useState } from "react";

import { SERVICES } from "~/lib/appwrite";
import type { UserModel } from "~/types/appwrite";

export interface AuthHook {
  // state
  user: UserModel | null;

  // actions
  updateUser: (user: UserModel | null) => void;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthHook | null>(null);

const AUTH_REVALIDATION_INTERVAL = 600000; // 10 min

export function AuthProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<UserModel | null>(null);

  const updateUser = (user: UserModel | null) => {
    setUser(user);
  };

  const logout = async () => {
    await SERVICES.account.deleteSession("current")
      .then(() => {
        setUser(null);
      });
  };

  const login = async (email: string, password: string) => {
    await SERVICES
      .account
      .createEmailPasswordSession(email, password);

    setUser(await SERVICES.account.get());
  };

  const register = async (email: string, password: string) => {
    await SERVICES.account.create(
      ID.unique(),
      email,
      password,
    );

    await login(email, password);
  };

  useEffect(() => {
    const getUser = () => {
      SERVICES.account.get()
        .then(user => setUser(user))
        .catch(() => {});
    };

    const id = setInterval(
      getUser,
      AUTH_REVALIDATION_INTERVAL,
    );

    return () => clearInterval(id);
  }, []);

  // eslint-disable-next-line react/no-unstable-context-value
  const value = {
    user,
    updateUser,
    logout,
    register,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
