import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { FormInput } from "@/components/molecules/FormInput";
import { ContainerPage } from "@/components/templates/container-page";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { pastaService } from "@/services/pasta.service";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Encontros", href: RotasEnum.CONFIGURACOES_ENCONTRO },
  { titulo: "Manutenção de encontro" }
]

const formSchema = z.object({
  nome: z.string()
    .min(1, { message: "Informe pelo menos 1 caractere" })
    .max(255, { message: "Limite de caracteres atingido" }),
  pasta: z.string().optional()
})

export function ManutencaoEncontros() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      pasta: undefined
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const { data: pastas } = useQuery({
    queryKey: [],
    queryFn: async () => await pastaService.findAll()
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-neutral-800 p-5 rounded-md space-y-8"
        >
          <section className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="Nome"
                  placeholder="Insira o nome do encontro"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="pasta"
              render={({ field }) => (
                <div className="flex flex-col gap-2.5">
                  <Label>Pasta</Label>

                  <Select value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        pastas?.dados.map((pasta) => {
                          return (
                            <SelectItem value={String(pasta.id)}>
                              {pasta.id}
                            </SelectItem>
                          )
                        })
                      }
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </section>

          <section>
            <span>{form.getValues("nome")}</span>
            <span>{form.getValues("pasta") + ""}</span>
          </section>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ContainerPage>
  )
}