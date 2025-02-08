import { BreadcrumbListType } from "@/components/atoms/breadcrumb"
import { FormFooter } from "@/components/molecules/form/form-footer"
import { FormInput } from "@/components/molecules/form/form-input"
import { FormInputFile } from "@/components/molecules/form/form-input-file"
import { FormSelect } from "@/components/molecules/form/form-select"
import { ContainerPage } from "@/components/templates/container-page"
import { Form, FormField } from "@/components/ui/form"
import { equipeMapper } from "@/lib/mappers/equipe.mapper"
import { queryClient } from "@/lib/useQuery/query-client"
import { toastService } from "@/lib/useQuery/toast-service"
import { validarFormatoArquivo } from "@/lib/utils"
import { encontroService } from "@/services/encontro-service"
import { equipeService } from "@/services/equipe-service"
import { EncontroResDto } from "@/types/dtos/services/encontro"
import { RotasApiEnum } from "@/types/enums/rotas-api-enum"
import { RotasAppEnum } from "@/types/enums/rotas-app-enum"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useId } from "react"
import { useForm } from "react-hook-form"
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
  equipe: z.string({ required_error: "Informe o nome da equipe" })
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

  const equipeId = location.state?.id as number | undefined
  const toastId = useId()

  const form = useForm<EquipeFormType>({ resolver: zodResolver(equipeFormSchema) })

  async function fetchDadosIniciais(equipeId?: number) {
    if (!equipeId) return

    try {
      const equipe = await equipeService.findById(equipeId)
      const equipeForm = equipeMapper.to(equipe)

      console.log(equipeForm)

      form.reset(equipeForm)
    } catch (error) {
      toastService.erro("Erro ao buscar os dados iniciais")
    }
  }

  const criarEquipeMutation = useMutation({
    mutationKey: [RotasApiEnum.EQUIPE],
    mutationFn: async function (data: EquipeFormType) {
      return await equipeService.save(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
      navigate(RotasAppEnum.CONFIGURACOES_EQUIPE)
      toastService.update(toastId, { render: "Sucesso ao criar equipe", type: "success" })
    },
    onError: () => toastService.update(toastId, { render: "Erro ao criar equipe", type: "error" })
  })

  const editarEquipeMutation = useMutation({
    mutationKey: [RotasApiEnum.EQUIPE, equipeId],
    mutationFn: async function (data: EquipeFormType) {
      return await equipeService.update(data.id!, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
      navigate(RotasAppEnum.CONFIGURACOES_EQUIPE)
      toastService.update(toastId, { render: "Sucesso ao atualizar equipe", type: "success" })
    },
    onError: () => toastService.update(toastId, { render: "Erro ao atualizar equipe", type: "error" })
  })

  async function onSubmit(data: EquipeFormType) {
    const toastMessage = data.id ? "Atualizando equipe" : "Criando equipe"
    toastService.loading(toastMessage, { toastId, autoClose: 5000 })

    if (data.id) editarEquipeMutation.mutate(data)
    else criarEquipeMutation.mutate(data)
  }

  function converterEquipeToSelectvalues(encontros: EncontroResDto[]) {
    return encontros?.map(encontro => ({ label: encontro.nome, value: encontro.id })) || []
  }

  useQuery({
    queryKey: [RotasApiEnum.EQUIPE],
    queryFn: async () => await fetchDadosIniciais(equipeId),
    enabled: !!equipeId
  })

  const { data: encontros } = useQuery({
    queryKey: [RotasApiEnum.ENCONTROS],
    queryFn: async () => await encontroService.findAll()
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
              name="equipe"
              control={form.control}
              render={({ field }) => (
                <FormInput
                  type="text"
                  label="Nome"
                  placeholder="Insira o nome da equipe"
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="arquivo"
              render={({ field }) => (
                <FormInputFile
                  label="Arquivo"
                  field={field}
                  onChange={(e) => field.onChange(e.target.files && e.target.files[0])}
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
                  opcoes={converterEquipeToSelectvalues(encontros || [])}
                  mensagemNaoSelecionado="Selecione um encontro"
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

      <DevTool control={form.control} />
    </ContainerPage>
  )
}