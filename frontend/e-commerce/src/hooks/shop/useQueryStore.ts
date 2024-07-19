import { useQuery } from "@tanstack/react-query";
import { fetchStore, StoreDataResponse } from "@/api/shop/storeApi";

export const useQueryStore = () => {
  const { data, isLoading, isSuccess, isError } = useQuery<StoreDataResponse>({
    queryKey: ["store"],
    queryFn: fetchStore,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
};
