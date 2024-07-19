import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/shop/storeApi";

/**
 * Custom hook for querying categories.
 * @returns An object containing the query data, loading state, success state, and error state.
 */
export const useQueryCategories = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
}