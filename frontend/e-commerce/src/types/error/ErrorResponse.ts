export type ErrorApiResponse = {
    response: {
        status: number;
        data?: {
            message: string;
        };
    };
};