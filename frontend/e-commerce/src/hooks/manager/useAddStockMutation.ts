import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addStock, StockParams, StockApiResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";

export const useAddStockMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<StockApiResponse, ApiError, StockParams>({
        mutationFn: addStock,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "add-stock" });
            const queryKeysToInvalidate = ["stock"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "add-stock" });
        },
    });
};