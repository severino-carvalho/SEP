import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { FormFooter } from "@/components/molecules/form/form-footer";
import { FormInput } from "@/components/molecules/form/form-input";
import { FormSelect, SelectOption } from "@/components/molecules/form/form-select";
import { ContainerPage } from "@/components/templates/container-page";
import { Form, FormField } from "@/components/ui/form";
import { toastService } from "@/lib/useQuery/toast-service";
import { encontroService } from "@/services/encontro.service";
import { pastaService } from "@/services/pasta.service";
import { EncontroResDto } from "@/types/dtos/services/encontro";
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
  { titulo: "Pastas", href: RotasAppEnum.CONFIGURACOES_PASTA },
  { titulo: "Manutenção de pastas" }
]

export const pastaFormSchema = z.object({
  id: z.coerce.number().optional(),
  equipe: z.string({ required_error: "Informe o nome da equipe" })
    .min(1, { message: "Informe o nome da equipe" })
    .max(255, { message: "Limite de caracteres atingido" }),
  arquivoBase64: z.string().optional(),
  encontroId: z.coerce.number({ invalid_type_error: "Selecione um encontro" })
})

type PastaFormType = z.infer<typeof pastaFormSchema>;

export function ManutencaoPastas() {
  const location = useLocation();
  const navigate = useNavigate()

  const pastaId = location.state?.id as number | undefined;

  const form = useForm<PastaFormType>({
    resolver: zodResolver(pastaFormSchema),
  })

  async function buscarDadosIniciais(equipeId?: number) {
    if (!equipeId) return

    try {
      const equipe = await pastaService.findById(equipeId || 0)

      form.reset(equipe)
    } catch (error) {
      toastService.erro("Erro ao buscar os dados iniciais");
    }
  }

  async function handleCriarPasta(data: Omit<PastaFormType, 'id'>) {
    const toastId = toastService.loading("Cadastrando pasta")

    try {
      await pastaService.save(data)

      navigate(RotasAppEnum.CONFIGURACOES_PASTA)

      toastService.update(toastId, {
        render: "Sucesso ao criar pasta",
        type: "success"
      });
    } catch (error) {
      toastService.update(toastId, {
        render: "Erro ao criar pasta",
        type: "error"
      });
    }
  }

  async function handleEditarPasta({ id, ...data }: PastaFormType) {
    const toastId = toastService.loading("Atualizando pasta")

    try {
      await pastaService.update(id!, data)

      navigate(RotasAppEnum.CONFIGURACOES_PASTA)

      toastService.update(toastId, {
        type: "success",
        render: "Sucesso ao atualizar pasta"
      })
    } catch (error) {
      toastService.update(toastId, {
        type: "error",
        render: "Erro ao atualizar pasta"
      })
    }
  }

  async function onSubmit(data: z.infer<typeof pastaFormSchema>) {
    if (data.id) return await handleEditarPasta(data)
    return await handleCriarPasta(data)
  }

  function converterPastaToSelectvalues(encontros: EncontroResDto[]): SelectOption[] {
    return encontros?.map(encontro => ({ label: encontro.nome, value: encontro.id })) || []
  }

  useQuery({
    queryKey: [RotasApiEnum.PASTAS],
    queryFn: async () => await buscarDadosIniciais(pastaId),
    enabled: !!pastaId
  })

  const { data: encontros } = useQuery({
    queryKey: [RotasApiEnum.ENCONTROS],
    queryFn: async () => await encontroService.findAll()
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
              name="equipe"
              control={form.control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="Nome"
                  placeholder="Insira o nome da pasta"
                  {...field}
                />
              )}
            />

            <FormField
              disabled={true}
              control={form.control}
              name="arquivoBase64"
              render={({ field }) => (
                <FormInput
                  type="file"
                  label="Arquivo"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="encontroId"
              render={({ field }) => (
                <FormSelect
                  field={field}
                  label="Encontro"
                  opcoes={converterPastaToSelectvalues(encontros || [])}
                  mensagemNaoSelecionado="Selecione um encontro"
                />
              )}
            />
          </section>

          <FormFooter
            isEdicao={!!pastaId}
            href={RotasAppEnum.CONFIGURACOES_PASTA}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </ContainerPage>
  )
}