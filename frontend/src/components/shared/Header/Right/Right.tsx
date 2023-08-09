import { Status } from "./Status";

export default function Right() {
  return (
    <div className="hidden items-center justify-end gap-4 lg:flex">
      <Status />
      <button className="rounded-full bg-orange-600 px-5 py-1.5 font-semibold text-white transition hover:bg-orange-700">
        Sign in
      </button>
    </div>
  );
}
