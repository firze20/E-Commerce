import {
  updateItem,
  UpdateItemParams,
  ItemApiResponse,
} from "@/api/manager/managerApi";
import { ApiError } from "@/api/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ItemApiResponse, ApiError, UpdateItemParams>({
    mutationFn: updateItem,
    onSuccess: (data) => {
      toast.success(data.message, { toastId: "update-item" });
      const queryKeysToInvalidate = ["store", "item"];
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    },
    onError: (error) => {
      toast.error(error.message, { toastId: "update-item" });
    },
  });
};
