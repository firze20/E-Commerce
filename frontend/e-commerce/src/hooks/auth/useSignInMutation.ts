import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/authApi";
import { useWhoAmIMutation } from "./useWhoAmIMutation";

export const useSignInMutation = () => {
  const { mutate: fetchUserInfo } = useWhoAmIMutation();
    
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      fetchUserInfo();
    },
    onError: (err) => {
      console.log(err);
    },
  });
}