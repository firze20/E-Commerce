import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/api/cart/cartApi";
import { toast } from "react-toastify";

export const useAddItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item added to cart", {
                position: "bottom-center"
            });
            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });

        },
        onError: (err) => {
            toast.error(`Error adding item to cart: ${err}`, {
                position: "bottom-center"
            }
            );
        },
    });
}