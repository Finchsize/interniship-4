import { Link, Outlet, useLoaderData } from "react-router-dom";
import { createContext } from "react";

export const NameContext = createContext<string | undefined>(undefined);

const User = () => {
  const user = useLoaderData() as {
    name: string;
    email: string;
    loggedIn?: boolean;
  };
  return (
    <>
      <div>
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Profile</p>
            <p className="text-lg text-neutral-700">
              This information is displayed to other users when they visit your
              profile.
            </p>
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
      </div>
      <NameContext.Provider value={user.name}>
        <Outlet />
      </NameContext.Provider>
    </>
  );
};

export default User;
