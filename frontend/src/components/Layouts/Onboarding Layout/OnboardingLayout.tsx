import { Outlet } from "react-router-dom";
import Gameplay from "../../../images/gameplay.png";
import Logo from "../../Logo";

const OnboardingLayout = () => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-white">
      <div className="hidden w-full grid-cols-2 gap-16 md:grid">
        <span />
        <img
          src={Gameplay}
          className="h-full min-h-screen w-full object-cover"
          alt="Gameplay screenshot"
        />
      </div>
      <div className="container absolute grid w-full grid-cols-1 gap-32 p-8 md:grid-cols-2">
        <div className="flex max-w-md flex-col justify-center gap-4">
          <Logo />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
