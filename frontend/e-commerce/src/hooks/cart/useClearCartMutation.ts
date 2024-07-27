import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";

export const useClearCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Cart cleared", {
                position: "bottom-center"
            });

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err) => {
            toast.error(`Error clearing cart: ${err}`, {
                position: "bottom-center"
            });
        },
    });
}