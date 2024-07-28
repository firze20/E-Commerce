

/**
 * Builds a query string from the given parameters object.
 *
 * @param params - The parameters object containing key-value pairs.
 * @returns The generated query string.
 */
export const buildQueryString = (params: Record<string, any>) => {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : "";
};