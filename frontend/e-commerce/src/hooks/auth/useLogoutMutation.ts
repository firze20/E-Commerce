import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout, AuthResponse } from "@/api/auth/authApi";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import type { ApiError } from "@/api/api.types";

export const useLogoutMutation = () => {

  const { deleteCookies } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<AuthResponse, ApiError>({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("User signed out successfully", {
        toastId: "logout",
      });
      deleteCookies();

      const queryKeysToInvalidate = [
        "who-am-i",
        "my-cart",
        "my-purchases"
      ];
      
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong while signing out 🙁");
    },
  });
};
