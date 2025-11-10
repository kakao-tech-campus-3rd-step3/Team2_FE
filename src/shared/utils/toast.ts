import { toast, type ToastOptions } from 'react-toastify';

export const showToast = (message: string, options?: ToastOptions) => {
  toast.dismiss();

  toast(message, {
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    ...options,
  });
};
