import { useQuery } from "@tanstack/react-query";
import { fetchCategories, CategoryResponse } from "@/api/shop/storeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";
/**
 * Custom hook for querying categories.
 * @returns An object containing the query data, loading state, success state, and error state.
 */
export const useQueryCategories = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery<CategoryResponse, ApiError>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchOnWindowFocus: false, // Prevents refetching when the window regains focus
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Categories fetched successfully", {
        toastId: "categories-toast",
        position: "bottom-left"
      });
    } else if (isError) {
      toast.error("Error fetching categories", {
        toastId: "categories-toast",
        position: "bottom-left"
      });
    }
  }, [isSuccess, isError]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  };
}