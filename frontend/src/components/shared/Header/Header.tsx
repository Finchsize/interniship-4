import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Right from "./Right/index";

export function Header() {
  return (
    <header className="grid w-full grid-cols-2 items-center justify-center bg-white p-8 lg:grid-cols-3">
      <Link to="/">
        <div className="flex flex-row items-center">
          <span className="-ml-2 flex h-[3.75rem] -translate-y-1.5 items-center font-icons text-6xl text-orange-600">
            local_fire_department
          </span>

          <h1 className="hidden text-3xl font-semibold lg:block">
            Dragon's <span className="text-orange-600">Nest</span>
          </h1>
        </div>
      </Link>
      <Navbar
        links={[
          { name: "Patch notes", href: "/" },
          { name: "Rankings", href: "/rankings" },
          { name: "Marketplace", href: "/" },
        ]}
      ></Navbar>
      <Right></Right>
    </header>
  );
}
