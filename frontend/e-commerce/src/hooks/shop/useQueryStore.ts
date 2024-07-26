import { useQuery } from "@tanstack/react-query";
import { fetchStore, StoreDataResponse } from "@/api/shop/storeApi";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";

/**
 * Custom hook for querying store data.
 * @param page - The page number for pagination.
 * @param filters - The filters to apply to the query.
 * @returns An object containing the queried store data and loading state.
 */
export const useQueryStore = (page: number, filters: Record<string, any>) => {

  const params = useMemo(() => ({ page, ...filters }), [page, filters]);
  const { data, isLoading, isSuccess, isError } = useQuery<StoreDataResponse>({
    queryKey: ["store", params],
    queryFn: ({ signal }) => fetchStore(params, { signal }),
    refetchOnWindowFocus: false, // Prevents refetching when the window regains focus
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Store data fetched successfully", {
        toastId: "store-data-toast",
        position: "bottom-center"
      });
    } else if (isError) {
      toast.error("Error fetching store data", {
        toastId: "store-data-toast",
        position: "bottom-center"
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
