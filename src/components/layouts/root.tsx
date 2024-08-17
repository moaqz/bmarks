import { Suspense, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { Footer } from "~/components/common/footer";
import { Header } from "~/components/common/header";
import { useAuth } from "~/hooks/useAuth";
import type { UserModel } from "~/types/appwrite";

export function RootLayout() {
  const { updateUser } = useAuth();
  const loaderData = useLoaderData();

  useEffect(() => {
    updateUser(loaderData as UserModel | null);
  }, [loaderData, updateUser]);

  return (
    <div className="flex flex-col px-4 min-h-dvh max-w-xl mx-auto gap-9">
      <Header />
      <main className="flex-1">
        <Suspense fallback={(
          <div className="flex justify-center">
            <svg width="32" height="32" className="animate-spin text-blue-10">
              <use href="/icons/ui.svg#loader-circle" />
            </svg>
          </div>
        )}
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
