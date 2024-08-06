import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { removeStock, StockParams, StockApiResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";

export const useRemoveStockMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<StockApiResponse, ApiError, StockParams>({
        mutationFn: removeStock,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "add-stock" });
            const queryKeysToInvalidate = ["stock", "item"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "add-stock" });
        },
    });
};