import { useMutation } from "@tanstack/react-query";
import { signIn, AuthResponse, SignInUser } from "@/api/auth/authApi";
import { useWhoAmIMutation } from "./useWhoAmIMutation";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";
import { useNavigate } from "react-router-dom";


export const useSignInMutation = () => {
  const { mutate: fetchUserInfo } = useWhoAmIMutation();
  

  const navigate = useNavigate();
    
  return useMutation<AuthResponse, ApiError, SignInUser>({
    mutationFn: signIn,
    onSuccess: () => {
      // Show a success toast
      toast.success("User signed in successfully");
      fetchUserInfo();
      navigate("/shop");
    },
    onError: (error) => {
      // Show an error toast
      if(error.response && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else toast.error(`Error signing in`);
    },
  });
}