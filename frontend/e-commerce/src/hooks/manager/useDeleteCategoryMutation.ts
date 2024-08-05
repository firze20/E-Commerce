import { deleteCategory, DeletedResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<DeletedResponse, ApiError, number>({
        mutationFn: deleteCategory,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "delete-category" });
            const queryKeysToInvalidate = ["categories"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "delete-category" });
        },
    });
};