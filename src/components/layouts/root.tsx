import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Footer } from "~/components/common/footer";
import { Header } from "~/components/common/header";
import { GUEST_ROUTES } from "~/constants/routes";
import { AUTH_STATES } from "~/contexts/auth-context";
import { useAuth } from "~/hooks/useAuth";

export function RootLayout() {
  const { authState } = useAuth();
  // local loading state to prevent flickering.
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState === AUTH_STATES.pending) {
      return;
    }

    if (
      authState === AUTH_STATES.unauthenticated
      && !GUEST_ROUTES.includes(pathname)
    ) {
      navigate("/login");
    }

    if (
      authState === AUTH_STATES.authenticated
      && GUEST_ROUTES.includes(pathname)
    ) {
      navigate("/bookmarks");
    }

    if (loading) {
      setLoading(false);
    };
  }, [authState, pathname, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-dvh grid place-content-center">
        <svg width="32" height="32" className="animate-spin text-blue-10">
          <use href="/icons/ui.svg#loader-circle" />
        </svg>
      </div>
    );
  }

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
