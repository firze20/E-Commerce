import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/authApi";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const useSignInMutation = () => {
    
  return useMutation({
    mutationFn: signIn,
    onSuccess: (res) => {

    },
    onError: (err) => {
      console.log(err);
    },
  });
}