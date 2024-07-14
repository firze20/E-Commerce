type WithAsyncFn<T = unknown> = () => T | Promise<T>;

type WithAsyncReturn<TData, TError> = Promise<{
  response: TData | null;
  error: TError | unknown;
}>;

/**
 * Executes an asynchronous function and returns the result or error.
 *
 * @template TData - The type of the data returned by the function.
 * @template TError - The type of the error thrown by the function.
 * @param {WithAsyncFn<TData>} fn - The asynchronous function to execute.
 * @returns {Promise<WithAsyncReturn<TData, TError>>} - A promise that resolves to an object containing the response or error.
 * @throws {Error} - If the first argument is not a function.
 */
export async function withAsync<TData = unknown, TError = unknown>(
  fn: WithAsyncFn<TData>
): WithAsyncReturn<TData, TError> {
  try {
    if (typeof fn !== "function") {
      throw new Error("The first argument must be a function");
    }
    const response = await fn();
    return {
      response,
      error: null,
    };
  } catch (error) {
    return {
      error,
      response: null,
    };
  }
}
