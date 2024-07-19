import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/authApi";
import { useWhoAmIMutation } from "./useWhoAmIMutation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useSignInMutation = () => {
  const { mutate: fetchUserInfo } = useWhoAmIMutation();
  

  const navigate = useNavigate();
    
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      // Show a success toast
      toast.success("User signed in successfully");
      fetchUserInfo();
      navigate("/shop");
    },
    onError: () => {
      toast.error("User doesn't exist, or invalid credentials 🙁")
    },
  });
}