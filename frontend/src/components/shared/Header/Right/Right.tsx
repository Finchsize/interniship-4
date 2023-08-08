import { Status } from "./Status";
import { Account } from "./Account";

export function Right() {
  return (
    <div
      className="flex items-center justify-end gap-8"
      style={{ width: "479.52px" }}
    >
      <Status></Status>
      <Account></Account>
    </div>
  );
}
