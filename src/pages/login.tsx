import { FormInput } from "@/components/molecules/form/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { toastService } from "@/lib/useQuery/toast-service";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z.string()
    .email({ message: "Informe um email válido" })
    .max(255, { message: "Limite de caracteres atingido" }),
  senha: z.string()
    .min(1, { message: "Informe sua senha" })
})

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const [isFetchLogin, setIsFetchLogin] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  if (isAuthenticated) return <Navigate to={RotasAppEnum.HOME} />;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsFetchLogin(true)
    const toastId = toastService.loading("Carregando solicitação")

    try {
      await login(values)

      const dataAtual = new Date()
      const mensagemLogin = mesagemBoasVindas(dataAtual)
      toastService.update(toastId, {
        render: mensagemLogin,
        type: "success"
      });
    } catch (error) {
      toastService.update(toastId, {
        render: "Erro ao realizar login",
        type: "error"
      });
    } finally {
      setIsFetchLogin(false)
    }
  }

  function mesagemBoasVindas(data: Date) {
    if (data.getHours() <= 12) {
      return "Bom dia, seja bem vindo!"
    } else if (data.getHours() >= 12 && data.getHours() < 18) {
      return "Boa tarde, seja bem vindo!"
    } else {
      return "Boa noite, seja bem vindo!"
    }
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="xl:w-4/12 lg:w-5/12 md:w-7/12 border border-neutral-800 p-5 rounded-md space-y-8"
        >
          <div className="flex flex-1 flex-col gap-1">
            <h1 className="text-3xl">Entrar</h1>
            <p>Sistema de Encontros Paroquiais</p>
          </div>

          <section className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="text"
                  label="Email"
                  placeholder="Insira o seu email"
                  autoComplete="off"
                  required={true}
                />
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormInput
                  {...field}
                  type="password"
                  label="Senha"
                  placeholder="Insira sua senha"
                  required={true}
                />
              )}
            />
          </section>

          <Button type="submit" disabled={isFetchLogin}>
            {isFetchLogin && <Loader2 className="animate-spin" />}
            {isFetchLogin ? "Entrando" : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  )
}