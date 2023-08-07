import { Navbar } from "./Navbar";
import { Right } from "./Right";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between self-stretch">
      <h1 className=" text-6xl font-semibold">Dragon's Nest CO</h1>
      <Navbar names={["Patch notes", "Rankings", "Marketplace"]}></Navbar>
      <Right></Right>
    </header>
  );
}
