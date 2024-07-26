import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "@/api/cart/cartApi";
import { toast } from "react-toastify";

export const useRemoveItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item removed from cart", {
                position: "bottom-center"
            });
            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err) => {
            toast.error(`Error removing item from cart: ${err}`, {
                position: "bottom-center"
            });
        },
    });
}