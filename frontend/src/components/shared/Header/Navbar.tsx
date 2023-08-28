import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Button";
import Status from "./components/Status";

const Navbar = ({ links }: { links: { name: string; href: string }[] }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      {show && (
        <div className="fixed inset-0 -z-10 h-full min-h-screen w-full bg-black/25 backdrop-blur-sm" />
      )}
      <div className="flex flex-row items-center justify-end lg:hidden">
        <button onClick={() => setShow(!show)} className="font-icons text-4xl">
          {!show ? "menu" : "close"}
        </button>
        {show && (
          <>
            <div className="absolute inset-0 mt-28 h-full min-h-screen w-full">
              <div className="flex w-full flex-col gap-4 rounded-b-2xl border-t border-t-neutral-300 bg-white p-8 shadow-lg">
                {links.map((link, key) => {
                  return (
                    <Link key={key} to={link.href}>
                      <p className="text-lg font-semibold text-neutral-700">
                        {link.name}
                      </p>
                    </Link>
                  );
                })}
                <div className="flex w-full flex-col gap-4 pt-4">
                  <Status />
                  <Link to="/sign-in" className="w-full">
                    <Button text="Sign in" fullWidth />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="hidden items-center justify-center gap-16 lg:flex">
        {links.map((link, key) => {
          return (
            <Link key={key} to={link.href}>
              <p className="font-medium text-neutral-700">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
