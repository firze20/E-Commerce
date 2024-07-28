import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePurchase } from "@/api/shop/purchaseApi";
import { toast } from "react-toastify";

/**
 * Custom hook for making a purchase mutation.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * @returns {Mutation} The mutation object with mutationFn, onSuccess, and onError handlers.
 */
export const useMakePurchaseMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: makePurchase,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Purchase successful", {
                position: "bottom-center"
            });
            // Invalidate the purchases query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["my-purchases"] });
            queryClient.invalidateQueries({ queryKey: ["item"] });

        },
        onError: () => {
            toast.error(`Error making purchase, try again later`, {
                position: "bottom-center"
            }
            );
        },
    });
}