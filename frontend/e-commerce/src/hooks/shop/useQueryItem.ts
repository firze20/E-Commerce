import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct, ItemResponse } from "@/api/shop/storeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

/**
 * Custom hook for querying a single item.
 * @param id - The ID of the item to query.
 * @returns An object containing the item data, loading state, success state, and error state.
 */
export const useQueryItem = (id: number) => {
  const { data, isLoading, isSuccess, isError } = useQuery<ItemResponse>({
    queryKey: ["item", id],
    queryFn: () => fetchSingleProduct(id),
    refetchOnWindowFocus: false, // Prevents refetching when the window regains focus
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Item data fetched successfully", {
        toastId: "item-data-toast",
      });
    } else if (isError) {
      toast.error("Error fetching item data", {
        toastId: "item-data-toast",
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
