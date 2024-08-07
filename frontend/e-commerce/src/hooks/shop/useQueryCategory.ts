import { useQuery } from "@tanstack/react-query";
import { fetchSingleCategory } from "@/api/shop/storeApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";
import { Category } from "@/api/types";

/**
 * Custom hook for querying a single category.
 * @param id - The ID of the category to query.
 * @returns An object containing the category data, loading state, success state, and error state.
 */

export const useQueryCategory = (id: number) => {
    const { data, isLoading, isSuccess, isError, error} = useQuery<Category, ApiError>({
        queryKey: ["category", id],
        queryFn: () => fetchSingleCategory(id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Category data fetched successfully", {
                toastId: "category-data-toast",
                position: "top-center",
            });
        } else if (isError) {
            if (error && error.response?.status === 404) {
                toast.info("Category not found", {
                    toastId: "category-data-toast",
                    position: "top-center",
                });
            } else {
                toast.error("Error fetching category data", {
                    toastId: "category-data-toast",
                    position: "top-center",
                });
            }
        }
    }, [isSuccess, isError]);

    return {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    };
}