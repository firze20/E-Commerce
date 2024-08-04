import { updateCategory, UpdateCategoryParams, CategoryApiResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CategoryApiResponse, ApiError, UpdateCategoryParams>({
        mutationFn: updateCategory,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "update-category" });
            const queryKeysToInvalidate = ["store", "item", "categories"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "update-category" });
        }
    })
};