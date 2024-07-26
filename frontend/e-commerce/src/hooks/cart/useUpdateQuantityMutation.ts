import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartQuantity } from "@/api/cart/cartApi";
import { toast } from "react-toastify";

export const useUpdateQuantityMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCartQuantity,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item quantity updated", {
                position: "top-center"
            });

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err) => {
            toast.error(`Error updating item quantity: ${err}`, {
                position: "top-center"
            });
        },
    });
}