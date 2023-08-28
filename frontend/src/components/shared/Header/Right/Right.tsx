import Status from "../components/Status";
import useSWR from "swr";
import { fetcher } from "../../../../lib/Fetcher";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Right() {
  const { data, error, isLoading } = useSWR("user/current-user", (url) =>
    fetcher(url, true),
  );
  useEffect(() => console.log("Data:", data), [data]);
  return (
    <div className="hidden items-center justify-end gap-4 lg:flex">
      <Status />
      {!isLoading ? (
        !error ? (
          <Link
            to="/profile"
            className="flex flex-row items-center gap-1 rounded-full bg-orange-600 px-4 py-1.5 text-white transition hover:bg-orange-700"
          >
            <span className="font-icons text-2xl">person</span>
            <p className="font-semibold">{data.name}</p>
          </Link>
        ) : (
          <a href="/sign-in">
            <button className="rounded-full bg-orange-600 px-5 py-1.5 font-semibold text-white transition hover:bg-orange-700">
              Sign in
            </button>
          </a>
        )
      ) : (
        <span className="animate-spin font-icons text-4xl text-neutral-700">
          refresh
        </span>
      )}
    </div>
  );
}
