import { createItem, ItemCreationParams, ItemApiResponse } from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ItemApiResponse, ApiError, ItemCreationParams>({
    mutationFn: createItem,
    onSuccess: (data) => {
      toast.success(data.message, { toastId: "create-item" });
      const queryKeysToInvalidate = [
        "store",
        "item"
      ]
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: (error) => {
      toast.error(error.message, { toastId: "create-item" });
    }   
    });
};