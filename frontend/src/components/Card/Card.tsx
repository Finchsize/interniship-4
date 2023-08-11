import { Link } from "react-router-dom";

export default function Card({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <Link to="/">
      <div className="flex flex-col items-start gap-4 rounded-4xl border-2 border-neutral-400 p-8">
        <div className="flex flex-col items-start gap-4">
          <p className="flex h-[4.5rem] items-center font-icons text-7xl text-orange-600">
            {icon}
          </p>
          <h1 className="text-4xl font-semibold">{title}</h1>
        </div>
        <p className="text-xl text-gray-700">{desc}</p>
      </div>
    </Link>
  );
}
