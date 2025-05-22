import { SEP_ENVIRONMENT } from "@/types/envs";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { toastService } from "../useQuery/toast-service";

export class ErroUtil {
  static tratar(error: unknown, toastId?: number, mensagemPadrao = "Ocorreu um erro inesperado.") {
    if (error instanceof AxiosError) {
      const mensagem = error.response?.data?.message || mensagemPadrao;

      if (toastId) toastService.erro(mensagem)
      else toastService.erro(mensagem)

      if (SEP_ENVIRONMENT === "development") console.error("Erro Axios:", error);
    } else if (error instanceof ZodError) {
      const mensagem = error.errors.map(err => err.message).join(" | ");
      toastService.erro(mensagem);
      if (SEP_ENVIRONMENT === "development") console.error("Erro Zod:", error);
    } else if (error instanceof Error) {
      toastService.erro(error.message || mensagemPadrao);
      if (SEP_ENVIRONMENT === "development") console.error("Erro desconhecido:", error);
    } else {
      toastService.erro(mensagemPadrao);
      if (SEP_ENVIRONMENT === "development") console.error("Erro não identificado:", error);
    }
  }
}
