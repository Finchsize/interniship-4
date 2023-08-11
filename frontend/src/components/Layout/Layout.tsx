import { Outlet } from "react-router-dom";
import { Header } from "../shared/Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 antialiased">
      <div className="container flex w-full flex-col gap-8 md:gap-16">
        <Header />
        <div className="flex w-full flex-col gap-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
