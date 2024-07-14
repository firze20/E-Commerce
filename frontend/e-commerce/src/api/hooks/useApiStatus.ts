import { useState, useMemo } from "react";
import {IDLE, defaultApiStatus, ApiStatus} from "@/api/constants/apiStatus";

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const prepareStatuses = (currentStatus: ApiStatus): Statuses => {
    const statuses = {} as Statuses;

    for(const status of defaultApiStatus) {
        const normalisedStatus = capitalize(status.toLowerCase());
        const normalisedStatusKey = `is${normalisedStatus}` as keyof Statuses;
        statuses[normalisedStatusKey] = status === currentStatus;
    };

    return statuses;
};

/**
 * Custom hook to manage the status of an API request.
 *
 * @param currentStatus - The initial status of the API request.
 * @returns An object containing the current status, a function to update the status, and additional status-related properties.
 */
export const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
    const [status, setStatus] = useState<ApiStatus>(currentStatus);

    const statuses = useMemo(() => prepareStatuses(status), [status]);

    return {
        status,
        setStatus,
        ...statuses
    }
};

