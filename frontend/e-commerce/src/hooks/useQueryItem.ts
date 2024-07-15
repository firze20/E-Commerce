import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct, ItemResponse } from "@/api/storeApi";

export const useQueryItem = (id: number) => {
    const { data, isLoading, isSuccess, isError } = useQuery<ItemResponse>({
        queryKey: ["item", id],
        queryFn: () => fetchSingleProduct(id),
    });

    return {
        data,
        isLoading,
        isSuccess,
        isError
    }
};

