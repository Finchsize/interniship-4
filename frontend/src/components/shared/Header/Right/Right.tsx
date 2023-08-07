import { Status } from "./Status";
import account from "../../../../images/account_circle_FILL0_wght200_GRAD0_opsz48.png";

export function Right() {
  return (
    <div
      className="flex items-center justify-end gap-8"
      style={{ width: "479.52px" }}
    >
      <Status></Status>
      <img src={account} alt="account_logo" height={64} width={64}></img>
    </div>
  );
}
