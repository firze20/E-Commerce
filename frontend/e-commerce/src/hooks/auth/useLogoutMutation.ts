import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth/authApi";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {

  const { deleteCookies } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("User signed out successfully", {
        toastId: "logout",
      });
      deleteCookies();
      queryClient.invalidateQueries({ queryKey: ["who-am-i", 'my-cart'] });
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong while signing out 🙁");
    },
  });
};
