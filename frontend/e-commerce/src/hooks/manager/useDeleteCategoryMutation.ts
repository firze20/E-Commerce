import { deleteCategory, DeletedResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation<DeletedResponse, ApiError, number>({
        mutationFn: deleteCategory,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "delete-category" });
            const queryKeysToInvalidate = ["categories", "category"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
            navigate("/manager/categories");
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "delete-category" });
        },
    });
};