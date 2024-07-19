import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/auth/authApi";
import { useWhoAmIMutation } from "./useWhoAmIMutation";
import { toast } from "react-toastify";

export const useSignInMutation = () => {
  const { mutate: fetchUserInfo } = useWhoAmIMutation();
    
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      // Show a success toast
      toast.success("User signed in successfully");
      fetchUserInfo();
    },
    onError: (err) => {
      // Show an error toast
      toast.error(`Error signing in: ${err}`);
    },
  });
}