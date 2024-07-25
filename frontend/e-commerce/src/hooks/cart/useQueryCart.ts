import { useQuery } from "@tanstack/react-query";
import { Cart, getMyCart } from "@/api/cart/cartApi";
import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthProvider";

export const useQueryCart = () => {
    const { isAuthenticated } = useContext(AuthContext).authState;

    const { data, isLoading, isSuccess, isError } = useQuery<Cart>({
        queryKey: ["my-cart"],
        queryFn: getMyCart,
        enabled: isAuthenticated, // Only enable the query if the user is authenticated
        refetchOnWindowFocus: false, // Prevents refetching when the window regains focus
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    
    useEffect(() => {
        if (isSuccess) {
        toast.success("Cart data fetched successfully", {
            toastId: "cart-data-toast",
        });
        } else if (isError) {
        toast.error("Error fetching cart data", {
            toastId: "cart-data-toast",
        });
        }
    }, [isSuccess, isError]);
    
    return {
        data,
        isLoading,
        isSuccess,
        isError,
    };
};
