import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { Footer } from "~/components/common/footer";
import { Header } from "~/components/common/header";
import { useAuth } from "~/hooks/useAuth";

export function RootLayout() {
  const { updateUser } = useAuth();
  const loaderData = useLoaderData();

  useEffect(() => {
    updateUser(loaderData);
  }, [loaderData, updateUser]);

  return (
    <div className="min-h-dvh flex flex-col px-4 max-w-xl mx-auto gap-9">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
