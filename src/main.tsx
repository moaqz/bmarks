import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "~/styles/reset.css";
import "~/styles/theme.css";
import "~/styles/utils.css";
import "@fontsource-variable/inter";

import { RootLayout } from "~/components/layouts/root";
import HomeView from "~/views/home-view";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
