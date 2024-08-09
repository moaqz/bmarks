import { Outlet } from "react-router-dom";
import { Header } from "~/components/common/header";

export function RootLayout() {
  return (
    <div className="max-w-xl mx-auto px-4 flex flex-col gap-9">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
