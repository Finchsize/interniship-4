import { Status } from "./Status";

export function Right() {
  return (
    <div
      className="flex items-center justify-end gap-8"
      style={{ width: "479.52px" }}
    >
      <Status></Status>
      <a href="/sign-in">
        <button className="rounded-full bg-orange-600 px-5 py-1.5 font-semibold text-white transition hover:bg-orange-700">
          Sign in
        </button>
      </a>
    </div>
  );
}
