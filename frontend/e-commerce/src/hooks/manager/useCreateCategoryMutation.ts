import { createCategory, CategoryCreationParams, CategoryApiResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CategoryApiResponse, ApiError, CategoryCreationParams>({
        mutationFn: createCategory,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "create-category" });
            const queryKeysToInvalidate = ["store", "item"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "create-category" });
        },
    });
};