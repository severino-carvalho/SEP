import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { FormFooter } from "@/components/molecules/form/form-footer";
import { FormInput } from "@/components/molecules/form/form-input";
import { ContainerPage } from "@/components/templates/container-page";
import { Form, FormField } from "@/components/ui/form";
import { toastService } from "@/lib/useQuery/toast-service";
import { encontroService } from "@/services/encontro-service";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Encontros", href: RotasAppEnum.CONFIGURACOES_ENCONTRO },
  { titulo: "Manutenção de encontro" }
]

const encontroFormSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string()
    .min(1, { message: "Informe pelo menos 1 caractere" })
    .max(255, { message: "Limite de caracteres atingido" }),
})

type EncontroFormType = z.infer<typeof encontroFormSchema>;

export function ManutencaoEncontros() {
  const location = useLocation();
  const navigate = useNavigate();

  const encontroId = location.state?.id as number | undefined;

  const form = useForm<z.infer<typeof encontroFormSchema>>({
    resolver: zodResolver(encontroFormSchema),
  })

  async function buscarDadosIniciais(encontroId?: number) {
    if (!encontroId) return

    try {
      const encontro = await encontroService.findById(encontroId || 0)

      form.reset(encontro)
    } catch (error) {
      toastService.erro("Erro ao buscar os dados iniciais");
    }
  }

  async function handleCriarEncontro(data: Omit<EncontroFormType, 'id'>) {
    const toastId = toastService.loading("Cadastrando encontro")

    try {
      await encontroService.save(data)

      navigate(RotasAppEnum.CONFIGURACOES_ENCONTRO)

      toastService.update(toastId, {
        render: "Sucesso ao criar encontro",
        type: "success"
      });
    } catch (error) {
      toastService.update(toastId, {
        render: "Erro ao criar encontro",
        type: "error"
      });
    }
  }

  async function handleEditarPasta({ id, ...data }: EncontroFormType) {
    const toastId = toastService.loading("Atualizando encontro")

    try {
      await encontroService.update(id!, data)

      navigate(RotasAppEnum.CONFIGURACOES_ENCONTRO)

      toastService.update(toastId, {
        type: "success",
        render: "Sucesso ao atualizar encontro"
      })
    } catch (error) {
      toastService.update(toastId, {
        type: "error",
        render: "Erro ao atualizar encontro"
      })
    }
  }

  async function onSubmit(data: z.infer<typeof encontroFormSchema>) {
    if (data.id) return await handleEditarPasta(data)
    return await handleCriarEncontro(data)
  }

  useQuery({
    queryKey: [RotasApiEnum.ENCONTROS],
    queryFn: async () => await buscarDadosIniciais(encontroId),
    enabled: !!encontroId
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
          </section>

          <FormFooter
            isEdicao={!!encontroId}
            href={RotasAppEnum.CONFIGURACOES_ENCONTRO}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </ContainerPage>
  )
}