import { Outlet } from "react-router-dom";
import { Header } from "../../shared/Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col items-center antialiased">
      <div className="container flex w-full flex-col md:gap-8">
        <Header />
        <div className="-z-20 flex w-full flex-col gap-16 px-8 pb-8 md:z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
