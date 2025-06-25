// src/utils/toast.utils.ts
import { toast } from 'react-toastify';

interface ApiError {
  data?: {
    message?: string;
  };
  message?: string;
}

export const showApiErrorToast = (error: ApiError | unknown) => {
  const message =
    (error as ApiError)?.data?.message ||
    (error as ApiError)?.message ||
    'Something went wrong. Please try again.';
  toast.error(message);
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showInfoToast = (message: string) => {
  toast.info(message);
};
