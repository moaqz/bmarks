import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "@fontsource-variable/inter";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";

import { RootLayout } from "~/components/layouts/root";
import { AuthProvider } from "~/contexts/auth-context";

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

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/sign-up",
        element: <SignUpView />,
      },
      {
        path: "/bookmarks",
        element: <BookmarksView />,
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
