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

export const formatDate = (
  inputDate: string | Date | null | undefined,
): string => {
  if (!inputDate) return 'NA';

  const date = new Date(inputDate);
  if (isNaN(date.getTime())) return 'NA';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
