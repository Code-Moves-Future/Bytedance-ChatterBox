import { AxiosError } from 'axios';

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return {
      code: error.code || 'UNKNOWN_ERROR',
      message: error.message,
      details: error.response?.data
    };
  }
  
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: String(error)
  };
}; 