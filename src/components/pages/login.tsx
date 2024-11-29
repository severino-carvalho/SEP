import { useAuth } from "@/hooks/use-auth";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import { FormInput } from "../molecules/FormInput";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

const formSchema = z.object({
  email: z.string()
    .email({ message: "Informe um email válido" })
    .max(255, { message: "Limite de caracteres atingido" }),
  senha: z.string()
    .min(1, { message: "Informe sua senha" })
})

export function Login() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) return <Navigate to={RotasEnum.HOME} />;

  const [isFetchLogin, setIsFetchLogin] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsFetchLogin(true)
    await login(values).finally(() => setIsFetchLogin(false))
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-5/12 border border-neutral-800 p-5 rounded-md space-y-8"
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
                  type="text"
                  label="Email"
                  placeholder="Insira o seu email"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="Senha"
                  placeholder="Insira sua senha"
                  {...field}
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