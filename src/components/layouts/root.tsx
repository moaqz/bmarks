import { Outlet } from "react-router-dom";
import { Header } from "~/components/common/header";

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
