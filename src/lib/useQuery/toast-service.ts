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
    return this.showToast("success", content, { ...this.defaultOptions, ...options });
  }

  erro<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("error", content, { ...this.defaultOptions, ...options });
  }

  info<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("info", content, { ...this.defaultOptions, ...options });
  }

  aviso<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return this.showToast("warning", content, { ...this.defaultOptions, ...options });
  }

  loading<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions<TData>): Id {
    return toast.loading(content, { ...this.defaultOptions, ...options });
  }

  update<TData = unknown>(toastId: Id, options: UpdateOptions<TData>) {
    return toast.update(toastId, { ...this.defaultOptions, isLoading: false, ...options });
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
