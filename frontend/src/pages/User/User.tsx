import { useLoaderData } from "react-router-dom";
import { createContext, useState } from "react";
import ChangePassword from "./ChangePassword/ChangePassword";
import ChangeEmail from "./ChangeEmail/ChangeEmail";

// Context for easier username access
export const NameContext = createContext<string | undefined>(undefined);

const User = () => {
  const user = useLoaderData() as {
    name: string;
    email: string;
    loggedIn?: boolean;
  };
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {!user.loggedIn && (
        <>
          <div className="flex flex-row gap-4">
            <button type="button" onClick={() => setShowEmailModal(true)}>
              Change email
            </button>
            <button type="button" onClick={() => setShowPasswordModal(true)}>
              Change password
            </button>
          </div>
          <NameContext.Provider value={user.name}>
            {showPasswordModal && (
              <ChangePassword onClose={() => setShowPasswordModal(false)} />
            )}
            {showEmailModal && (
              <ChangeEmail onClose={() => setShowEmailModal(false)} />
            )}
          </NameContext.Provider>
        </>
      )}
    </div>
  );
};

export default User;
