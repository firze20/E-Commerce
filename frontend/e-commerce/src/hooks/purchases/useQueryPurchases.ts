import { useQuery } from "@tanstack/react-query";
import { getMyPurchases } from "@/api/shop/purchaseApi";
import { useEffect, useContext, useMemo } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "react-toastify";

/**
 * Custom hook to query purchases data.
 * @returns An object containing the purchases data and loading/error states.
 */
export const useQueryPurchases = (page: number, filters?: Record<string, string>) => {

    const params = useMemo(() => ({ page, ...filters }), [page, filters]);

    const { isAuthenticated } = useContext(AuthContext).authState;

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["my-purchases", params],
        queryFn: ({ signal }) => getMyPurchases(params, { signal }),
        enabled: isAuthenticated,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Purchases data fetched successfully", {
                toastId: "purchases-data-toast",
                position: "top-left"
            });
        } else if (isError) {
            toast.error("Error fetching purchases data", {
                toastId: "purchases-data-toast",
                position: "top-left"
            });
        }
    }, [isSuccess, isError]);

    return {
        data,
        isLoading,
        isSuccess,
        isError,
    };
}