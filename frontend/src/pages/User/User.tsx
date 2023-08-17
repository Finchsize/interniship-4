import { Link, Outlet, useLoaderData } from "react-router-dom";

const User = () => {
  const user = useLoaderData() as {
    name: string;
    email: string;
    loggedIn?: boolean;
  };
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {!user.loggedIn && (
        <>
          <div className="flex flex-row gap-4">
            <Link to={`/user/${user.name}/change-email`}>Change email</Link>
            <Link to={`/user/${user.name}/change-password`}>
              Change password
            </Link>
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default User;
