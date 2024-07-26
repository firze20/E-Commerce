import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";
import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect } from "react";

const LogOut = () => {
  const { isAuthenticated } = useContext(AuthContext).authState;
  const { mutate } = useLogoutMutation();

  useEffect(() => {
    if(isAuthenticated) {
      mutate();
    }
  }, []);

  return (
    <div className="mockup-window border-base-300 border">
      <div className="border-base-300 flex justify-center border-t px-4 py-16">
        {!isAuthenticated ? (
          <p>You are not logged in</p>
        ) : <p>Logged out...</p>
         }
      </div>
    </div>
  );
};

export default LogOut;
