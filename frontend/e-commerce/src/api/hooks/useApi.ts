import { useState } from "react";
import { useApiStatus } from "./useApiStatus";
import { PENDING, SUCCESS, ERROR } from "../constants/apiStatus";

interface UseApiConfig<T> {
  initialData?: T;
}

type ApiFunction<T = unknown> = (...args: unknown[]) => T | Promise<T>;

/**
 * Custom hook for making API calls.
 *
 * @template TData - The type of the data returned by the API.
 * @template TError - The type of the error returned by the API.
 * @param {ApiFunction<TData>} fn - The API function to be called.
 * @param {UseApiConfig<TData>} [config={}] - Configuration options for the hook.
 * @returns {Object} - An object containing the data, status, error, and helper functions.
 */
export function useApi<TData = unknown, TError = unknown>(
    fn: ApiFunction<TData>,
    config: UseApiConfig<TData> = {}
) {
    const { initialData } = config;
    const [data, setData] = useState<TData | undefined>(initialData);
    const [error, setError] = useState<TError | unknown>();

    const { status, setStatus, ...normalisedStatuses } = useApiStatus();

    /**
     * Executes the API function with the provided arguments.
     *
     * @template A - The type of the arguments passed to the API function.
     * @param {...A[]} args - The arguments to be passed to the API function.
     * @returns {Promise<Object>} - A promise that resolves to an object containing the data and error.
     */
    const exec = async <A>(...args: A[]) => {
        try {
            setStatus(PENDING);
            const data = await fn(...args);
            setData(data);
            setStatus(SUCCESS);
            return {
                data,
                error: null,
            };
        } catch (error) {
            setError(error);
            setStatus(ERROR);
            return {
                error,
                data: null,
            };
        }
    };

    return {
        data,
        setData,
        status,
        setStatus,
        error,
        exec,
        ...normalisedStatuses,
    };
}
