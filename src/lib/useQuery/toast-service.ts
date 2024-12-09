import { Id, toast, ToastContent, ToastOptions, TypeOptions, UpdateOptions } from "react-toastify";

class ToastService {
  private readonly defaultOptions: ToastOptions<never>;

  constructor() {
    this.defaultOptions = {
      autoClose: 5000,
      closeButton: true,
      closeOnClick: true,
    };
  }

  private showToast<TData = never>(
    type: TypeOptions,
    content: ToastContent<TData>,
    options?: ToastOptions<TData>
  ): Id {
    return toast(content, { ...this.defaultOptions, ...options, type });
  }

  sucesso<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("success", content, options);
  }

  erro<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("error", content, options);
  }

  info<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("info", content, options);
  }

  aviso<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("warning", content, options);
  }

  loading<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return toast.loading(content, { ...this.defaultOptions, ...options });
  }

  update<TData = unknown>(toastId: Id, options: UpdateOptions<TData>) {
    return toast.update(toastId, { isLoading: false, ...options });
  }

  dismiss(id?: Id) {
    return toast.dismiss(id);
  }

  isActive(id: Id): boolean {
    return toast.isActive(id);
  }
}

export const toastService = new ToastService();
export { toast };
