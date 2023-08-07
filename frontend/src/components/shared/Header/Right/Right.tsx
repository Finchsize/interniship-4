import { Status } from "./Status";

export function Right() {
  return (
    <div
      className="flex items-center justify-end gap-8"
      style={{ width: "479.52px" }}
    >
      <Status></Status>
      <span className="font-icons text-6xl">account_circle</span>
    </div>
  );
}
