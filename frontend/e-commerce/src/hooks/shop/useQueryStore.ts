import { useQuery } from "@tanstack/react-query";
import { fetchStore, StoreDataResponse } from "@/api/shop/storeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";


export const useQueryStore = (page: number) => {
  const { data, isLoading, isSuccess, isError } = useQuery<StoreDataResponse>({
    queryKey: ["store", page],
    queryFn: () => fetchStore(page),
  });

  useEffect(() => {
    if(isSuccess) {
      toast.success("Store data fetched successfully", {
        toastId: "store-data-toast",
      });
    } else if(isError) {
      toast.error("Error fetching store data", {
        toastId: "store-data-toast",
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
