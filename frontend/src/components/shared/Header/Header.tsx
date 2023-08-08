import { Navbar } from "./Navbar";
import { Right } from "./Right";

export function Header() {
  var pages: string[] = ["Patch notes", "Rankings", "Marketplace"];
  return (
    <header className="flex w-full items-center justify-between self-stretch">
      <a href="/">
        <h1 className=" text-6xl font-semibold">Dragon's Nest CO</h1>
      </a>
      <Navbar names={pages}></Navbar>
      <Right></Right>
    </header>
  );
}
