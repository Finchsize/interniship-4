import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import { useSWRConfig } from "swr";

export const NameContext = createContext<string | undefined>(undefined);

const User = () => {
  const user = useLoaderData() as {
    name: string;
    email: string;
    loggedIn?: boolean;
  };
  return (
    <>
      <div className="space-y-16">
        <div className="space-y-8">
          <div className="flex flex-row justify-between gap-8">
            <div className="space-y-2">
              <p className="text-2xl font-semibold">Profile</p>
              <p className="text-lg text-neutral-700">
                This information is displayed to other users when they visit
                your profile.
              </p>
            </div>
            <Logout />
          </div>
          <dl className="space-y-8">
            <div className="flex flex-row">
              <dt className="w-32 font-semibold">Name</dt>
              <dd className="flex w-full flex-1 justify-between gap-8">
                {user.name}
              </dd>
            </div>
            <div className="flex flex-row">
              <dt className="w-32 font-semibold">Email address</dt>
              <dd className="flex w-full flex-1 flex-row justify-between gap-8">
                <div>{user.email}</div>
                <Link
                  to={"/profile/change-email"}
                  className="font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  Change
                </Link>
              </dd>
            </div>
            <div className="flex flex-row">
              <dt className="w-32 font-semibold">Password</dt>
              <dd className="flex w-full flex-1 flex-row justify-between gap-8">
                <div>●●●●●●●●</div>
                <Link
                  to={"/profile/change-password"}
                  className="font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  Change
                </Link>
              </dd>
            </div>
          </dl>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Game options</p>
            <p className="text-lg text-neutral-700">
              Use those whenever something wrong happens in the game.
            </p>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 rounded-2xl border-2 border-neutral-300 p-4">
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="whitespace-nowrap text-xl font-semibold">
                  Unstuck character
                </p>
                <p>
                  If your character got stuck, click here to teleport it to
                  default spawn location.
                </p>
              </div>
              <p className="font-semibold text-red-600">
                Warning: You have to logout from the game to use this.
              </p>
            </div>
            <Unstuck />
          </div>
        </div>
      </div>
      <NameContext.Provider value={user.name}>
        <Outlet />
      </NameContext.Provider>
    </>
  );
};

const Unstuck = () => {
  const [loading, setLoading] = useState(false);
  const unstuckCharacter = async () => {
    setLoading(true);
    await axios
      .put(
        `${process.env.REACT_APP_API}player/unstuck`,
        {},
        { withCredentials: true },
      )
      .then(() => setLoading(false));
  };
  return (
    <div>
      <Button
        onClick={unstuckCharacter}
        loading={loading}
        text="Unstuck character"
      />
    </div>
  );
};

const Logout = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const logout = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API}user/logout`,
        {},
        { withCredentials: true },
      )
      .then(() => {
        mutate("user/current-user");
        navigate("/");
      });
  };
  return (
    <button
      onClick={logout}
      className="text-lg font-semibold text-orange-600 transition hover:text-orange-700"
    >
      Logout
    </button>
  );
};

export default User;
