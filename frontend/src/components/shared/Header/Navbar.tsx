import { Link } from "react-router-dom";

const Navbar = ({ names }: { names: string[] }) => {
  return (
    <div className="hidden items-center justify-center gap-16 lg:flex">
      {names.map((name, key) => {
        return (
          <Link key={key} to="/">
            <p className="font-medium text-neutral-700">{name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
