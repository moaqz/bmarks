import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "@fontsource-variable/inter";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";

import { SERVICES } from "~/lib/appwrite";
import { RootLayout } from "~/components/layouts/root";
import { AuthProvider } from "~/contexts/auth-provider";

// Views and Layouts.
const HomeView = lazy(() => import("~/views/home").then((module) => {
  return { default: module.HomeView };
}));

const SignUpView = lazy(() => import("~/views/sign-up").then((module) => {
  return { default: module.SignUpView };
}));

const LoginView = lazy(() => import("~/views/login").then((module) => {
  return { default: module.LoginView };
}));

const BookmarksView = lazy(() => import("~/views/bookmarks").then((module) => {
  return { default: module.BookmarksView };
}));

const AuthenticatedLayout = lazy(() => import("~/components/layouts/authenticated").then((module) => {
  return { default: module.AuthenticatedLayout };
}));

const GuestLayout = lazy(() => import("~/components/layouts/guest").then((module) => {
  return { default: module.GuestLayout };
}));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    loader: async () => {
      /**
       * Loads the user when the page is initially loaded.
       * The `AuthProvider` periodically checks the session and manages the user state.
       */
      try {
        const user = await SERVICES.account.get();
        return user;
      }
      catch {
        return null;
      }
    },
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        element: <GuestLayout />,
        children: [
          {
            path: "/login",
            element: <LoginView />,
          },
          {
            path: "/sign-up",
            element: <SignUpView />,
          },
        ],
      },
      {
        element: <AuthenticatedLayout />,
        children: [
          {
            path: "/bookmarks",
            element: <BookmarksView />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <Toaster richColors position="bottom-center" />
  </React.StrictMode>,
);
