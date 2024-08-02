import { useMutation } from "@tanstack/react-query";
import { whoami, WhoAmIResponse } from "@/api/auth/authApi";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";

export const useWhoAmIMutation = () => {
  const { updateAuthState } = useContext(AuthContext);

  return useMutation<WhoAmIResponse, ApiError>({
    mutationFn: whoami,
    onSuccess: (res) => {
      toast.success("User info sucessfully fetched", {
        toastId: "who-am-i",
      });
      updateAuthState({
        isAuthenticated: true,
        user: res.user,
      });
    },
    onError: () => {
      toast.info(`Register or Log In to start shopping! 🛒`, {
        toastId: "who-am-i",
      });
      updateAuthState({
        isAuthenticated: false,
        user: null,
      });
    },
  });
};
