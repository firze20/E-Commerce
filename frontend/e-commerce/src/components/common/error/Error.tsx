import { ApiError } from "@/api/api.types";

type ErrorProps = {
  error: ApiError;
  message?: string;
};

const Error = ({ error, message }: ErrorProps) => {
  let errorMessage =
    message || error.response?.data.message || "An unexpected error occurred.";
  let errorClassName = "alert-error";

  switch (error.response?.status) {
    case 400:
      errorClassName = "alert-warning";
      break;
    case 401:
      errorClassName = "alert-info";
      break;
    case 403:
      errorClassName = "alert-warning";
      break;
    case 404:
      errorClassName = "alert-info";
      break;
    case 500:
      errorClassName = "alert-error";
      break;
    default:
      errorClassName = "alert-error";
      break;
  }

  return (
    <div role="alert" className={`alert ${errorClassName}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{errorMessage}</span>
    </div>
  );
};

export default Error;
