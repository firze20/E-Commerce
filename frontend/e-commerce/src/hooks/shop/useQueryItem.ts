import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct, ItemResponse } from "@/api/shop/storeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useQueryItem = (id: number) => {
  const { data, isLoading, isSuccess, isError } = useQuery<ItemResponse>({
    queryKey: ["item", id],
    queryFn: () => fetchSingleProduct(id),
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
