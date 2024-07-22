import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/shop/storeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
/**
 * Custom hook for querying categories.
 * @returns An object containing the query data, loading state, success state, and error state.
 */
export const useQueryCategories = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Categories fetched successfully 🛍️", {
        toastId: "categories-toast",
      });
    } else if (isError) {
      toast.error("Error fetching categories", {
        toastId: "categories-toast",
      });
    }
  }, [isSuccess, isError]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
}