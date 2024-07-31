import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePurchase } from "@/api/shop/purchaseApi";
import { toast } from "react-toastify";
import type { ErrorApiResponse } from "@/types/error/ErrorResponse";

/**
 * Custom hook for making a purchase mutation.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * @returns The mutation object with mutationFn, onSuccess, and onError handlers.
 */
export const useMakePurchaseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: makePurchase,
    onSuccess: () => {
      // Show a success toast
      toast.success("Purchase successful", {
        position: "bottom-center",
      });
      const queryKeysToInvalidate = [
        "my-purchases",
        "my-cart",
        "store",
        "item",
      ];
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: (error: ErrorApiResponse) => {
      if (error.response.status === 409) {
        toast.warn(`${error.response.data!.message}`, {
          position: "bottom-center",
        });
      } else {
        toast.error("An error occurred while making the purchase", {
          position: "bottom-center",
        });
      }
    },
  });
};
