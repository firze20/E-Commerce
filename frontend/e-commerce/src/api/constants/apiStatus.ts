/**
 * Represents the status of an API request.
 * Possible values are "IDLE", "PENDING", "SUCCESS", and "ERROR".
 */
export type ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export const IDLE: ApiStatus = "IDLE";
export const PENDING: ApiStatus = "PENDING";
export const SUCCESS: ApiStatus = "SUCCESS";
export const ERROR: ApiStatus = "ERROR";

export const defaultApiStatus: ApiStatus[] = [
    'IDLE',
    'PENDING',
    'SUCCESS',
    'ERROR',
]

/**
 * Represents the possible API statuses.
 */
export type ApiStatuses = Record<ApiStatus, ApiStatus>

/**
 * Represents the status of an API request.
 */
export const apiStatus: ApiStatuses = {
    IDLE,
    PENDING,
    SUCCESS,
    ERROR,
}

