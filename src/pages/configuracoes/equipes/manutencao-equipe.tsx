import { BreadcrumbListType } from "@/components/atoms/breadcrumb"
import { FormFooter } from "@/components/molecules/form/form-footer"
import { FormInput } from "@/components/molecules/form/form-input"
import { FormInputFile } from "@/components/molecules/form/form-input-file"
import { FormSelect } from "@/components/molecules/form/form-select"
import { Alerta } from "@/components/molecules/tabela/alerta-deletar"
import { ContainerPage } from "@/components/templates/container-page"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { gerarLinkDownload } from "@/lib/download"
import { equipeMapper } from "@/lib/mappers/equipe.mapper"
import { queryClient } from "@/lib/useQuery/query-client"
import { toastService } from "@/lib/useQuery/toast-service"
import { validarFormatoArquivo } from "@/lib/utils"
import { encontroService } from "@/services/encontro-service"
import { equipeService } from "@/services/equipe-service"
import { EncontroResDto } from "@/types/dtos/services/encontro"
import { RotasApiEnum } from "@/types/enums/rotas-api-enum"
import { RotasAppEnum } from "@/types/enums/rotas-app-enum"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { Download, Trash2 } from "lucide-react"
import { useState } from "react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Equipes", href: RotasAppEnum.CONFIGURACOES_EQUIPE },
  { titulo: "Manutenção de equipes" }
]

const formatoArquivosPermitidos = ["pdf", "doc", "docx"]

export const equipeFormSchema = z.object({
  id: z.coerce.number().optional(),
  nome: z.string({ required_error: "Informe o nome da equipe" })
    .min(1, { message: "Informe o nome da equipe" })
    .max(255, { message: "Limite de caracteres atingido" }),
  arquivo: z.instanceof(File)
    .refine((file) =>
      validarFormatoArquivo(file, formatoArquivosPermitidos),
      { message: "Arquivo não suportado" })
    .optional(),
  encontroId: z.coerce.number({ invalid_type_error: "Selecione um encontro" })
})

type EquipeFormType = z.infer<typeof equipeFormSchema>

export function ManutencaoEquipes() {
  const location = useLocation()
  const navigate = useNavigate()

  const equipeId: number | undefined = location.state?.id

  const [arquivoId, setArquivoId] = useState<number | undefined>(location.state?.arquivoId)
  const [isModalRemoverOpen, setIsModalRemoverOpen] = useState(false)

  const form = useForm<EquipeFormType>({ resolver: zodResolver(equipeFormSchema) })

  async function fetchDadosIniciais(equipeId?: number) {
    if (!equipeId) return

    try {
      const equipe = await equipeService.findById(equipeId)
      const equipeForm = equipeMapper.to(equipe)

      form.reset(equipeForm)
    } catch (error) {
      toastService.erro("Erro ao buscar os dados iniciais")
    }
  }

  async function criarEquipe(data: EquipeFormType) {
    const toastId = toastService.loading("Criando equipe")

    try {
      await equipeService.save(data)
      await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })

      toastService.update(toastId, { render: "Sucesso ao criar equipe", type: "success" })
      navigate(RotasAppEnum.CONFIGURACOES_EQUIPE)
    } catch (error) {
      toastService.update(toastId, { render: "Erro ao criar equipe", type: "error" })
    }
  }

  async function atualizarEquipe(data: EquipeFormType) {
    const toastId = toastService.loading("Atualizando equipe")

    try {
      await equipeService.update(data.id!, data)
      await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })

      navigate(RotasAppEnum.CONFIGURACOES_EQUIPE)
      toastService.update(toastId, { render: "Sucesso ao atualizar equipe", type: "success" })
    } catch (error) {
      toastService.update(toastId, { render: "Erro ao atualizar equipe", type: "error" })
    }
  }

  async function onSubmit(data: EquipeFormType) {
    if (data.id) await atualizarEquipe(data)
    else await criarEquipe(data)

    await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
  }

  function converterEquipeToSelectvalues(encontros: EncontroResDto[]) {
    return encontros?.map(encontro => ({ label: encontro.nome, value: encontro.id })) || []
  }

  async function downloadPasta(pastaId: number) {
    const toastId = toastService.loading("Baixando pasta")

    try {
      const pasta = await equipeService.downloadPasta(pastaId)
      gerarLinkDownload(pasta)
      toastService.update(toastId, { render: "Sucesso ao baixar pasta", type: "success" })
    } catch (error) {
      toastService.update(toastId, { render: "Erro ao baixar pasta", type: "error" })
    }
  }

  async function removerPasta(equipeId: number, pastaId: number) {
    const toastId = toastService.loading("Removendo pasta")

    try {
      await equipeService.deletePasta(equipeId, pastaId)
      setArquivoId(undefined)

      toastService.update(toastId, { render: "Sucesso ao remover pasta", type: "success" })
      await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
    } catch (error) {
      toastService.update(toastId, { render: "Erro ao remover pasta", type: "error" })
    }
  }

  function InputFileEquipe(props: { field: ControllerRenderProps<any> }) {
    return (
      <div className="flex items-end gap-2 w-full">
        <FormInputFile field={props.field} label="Pasta" />

        {
          (equipeId && arquivoId) && (
            <div className="flex gap-2">
              <Alerta
                isOpen={isModalRemoverOpen}
                onConfirmar={() => removerPasta(equipeId, arquivoId)}
                onOpenChange={(isOpen: boolean) => setIsModalRemoverOpen(isOpen)}
                mensagem={"Você deseja remover permanentimente a pasta?"}
              />

              <Button
                type="button"
                variant="destructive-outline"
                onClick={() => setIsModalRemoverOpen(true)}
                disabled={!arquivoId}
                aria-label="Remover pasta"
              >
                <Trash2 />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => downloadPasta(arquivoId)}
                aria-label="Baixar pasta"
              >
                <Download />
              </Button>
            </div>
          )
        }
      </div>
    )
  }

  useQuery({
    queryKey: [RotasApiEnum.EQUIPE],
    queryFn: async () => await fetchDadosIniciais(equipeId),
    enabled: !!equipeId
  })

  const { data: encontros, isFetching } = useQuery({
    queryKey: [RotasApiEnum.ENCONTROS],
    queryFn: async () => {
      const response = await encontroService.findAll()
      return (response as any)?.content || response || []
    }
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-neutral-800 p-5 rounded-md space-y-8"
        >
          <section className="flex flex-col gap-5">
            <FormField
              name="nome"
              control={form.control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="Nome"
                  placeholder="Insira o nome da equipe"
                  required={true}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="arquivo"
              render={({ field }) => (<InputFileEquipe field={field} />)}
            />

            <FormField
              control={form.control}
              name="encontroId"
              render={({ field }) => (
                <FormSelect
                  field={field as never}
                  label="Encontro"
                  isLoading={isFetching}
                  opcoes={converterEquipeToSelectvalues(encontros || [])}
                  placeholder="Selecione um encontro"
                  required={true}
                />
              )}
            />
          </section>

          <FormFooter
            isEdicao={!!equipeId}
            href={RotasAppEnum.CONFIGURACOES_EQUIPE}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </ContainerPage>
  )
}