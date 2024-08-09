import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "@fontsource-variable/inter";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";

// Services.
import { SERVICES } from "~/lib/appwrite";

// Views and Layouts.
import { SignUpView } from "~/views/sign-up";
import { LoginView } from "~/views/login";
import { GuestLayout } from "~/components/layouts/guest";
import { BookmarksView } from "~/views/bookmarks";
import { AuthenticatedLayout } from "~/components/layouts/authenticated";
import { RootLayout } from "~/components/layouts/root";
import { HomeView } from "~/views/home";

// Providers.
import { AuthProvider } from "~/contexts/auth-provider";

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
