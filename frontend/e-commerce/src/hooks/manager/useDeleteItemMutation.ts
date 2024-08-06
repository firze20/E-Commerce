import { deleteItem, DeletedResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useDeleteItemMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation<DeletedResponse, ApiError, number>({
        mutationFn: deleteItem,
        onSuccess: (data) => {
            toast.success(data.message, { toastId: "delete-item" });
            const queryKeysToInvalidate = ["store", "item"];
            queryKeysToInvalidate.forEach((key) =>
                queryClient.invalidateQueries({ queryKey: [key] })
            );
            navigate("/manager/items");
        },
        onError: (error) => {
            toast.error(error.message, { toastId: "delete-item" });
        },
    });
};