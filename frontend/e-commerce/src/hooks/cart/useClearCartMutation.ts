import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/api/cart/cartApi";
import { toast } from "react-toastify";

export const useClearCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Cart cleared");

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err) => {
            toast.error(`Error clearing cart: ${err}`);
        },
    });
}