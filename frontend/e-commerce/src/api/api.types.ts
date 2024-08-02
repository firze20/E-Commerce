import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosPromise,
  Canceler,
} from "axios";

/**
 * Represents a canceler function.
 */
export type { Canceler };

type AxiosMethods = Pick<
  AxiosInstance,
  "get" | "put" | "patch" | "post" | "delete"
>;

/**
 * Represents a type that includes one of the Axios request methods along with an abort function.
 * @template T - The type of the Axios request method.
 */
export type WithAbortFn = AxiosMethods[keyof AxiosMethods];

/**
 * Represents a function that executes an API request and returns a promise of type T.
 * @template T - The type of the response data.
 * @param {string} url - The URL of the API endpoint.
 * @param {unknown} body - The request body.
 * @param {ApiRequestConfig} config - The configuration for the API request.
 * @returns {AxiosPromise<T>} - A promise that resolves to the response data.
 */
export type ApiExecutor<T> = {
  (url: string, body: unknown, config: ApiRequestConfig): AxiosPromise<T>;
  (url: string, config: ApiRequestConfig): AxiosPromise<T>;
};

/**
 * Represents the arguments for executing an API request.
 * It can either be an array with three elements: the API endpoint, the request payload, and the request configuration,
 * or an array with two elements: the API endpoint and the request configuration.
 */
export type ApiExecutorArgs =
  | [string, unknown, ApiRequestConfig]
  | [string, ApiRequestConfig];

/**
 * Represents the configuration for an API request.
 * Extends AxiosRequestConfig with an optional `abort` function.
 */
export type ApiRequestConfig = AxiosRequestConfig & {
    /**
     * A function that can be used to abort the API request.
     * @param cancel - The canceler function provided by Axios.
     */
    abort?: (cancel: Canceler) => void;
};

/**
 * Represents an API error.
 * Extends the AxiosError type and includes an optional 'aborted' property.
 */
export type ApiError = AxiosError<{
  message?: string;
}> & {
  aborted?: boolean
}
