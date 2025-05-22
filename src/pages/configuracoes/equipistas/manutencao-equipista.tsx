import { BreadcrumbListType } from "@/components/atoms/breadcrumb"
import { FormFooter } from "@/components/molecules/form/form-footer"
import { ContainerPage } from "@/components/templates/container-page"
import { Form } from "@/components/ui/form"
import { ErroUtil } from "@/lib/erros/erro-util"
import { queryClient } from "@/lib/useQuery/query-client"
import { toastService } from "@/lib/useQuery/toast-service"
import { equipistaService } from "@/services/equipista-service"
import { EquipistaReqDto } from "@/types/dtos/services/equipista"
import { RotasApiEnum } from "@/types/enums/rotas-api-enum"
import { RotasAppEnum } from "@/types/enums/rotas-app-enum"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { AreaAtuacaoFrom } from "./form/area-atuacao-equipista-form"
import { EnderecoEquipistaForm } from "./form/endereco-equipista-form"
import { CadastrosBasicos } from "./form/pessoal-equipista-form"
import { ExtrasEquipistaForm } from "./form/vida-crista-equipista-form"
import { equipistaFormSchema } from "./utils/equipista-zod"

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Equipistas", href: RotasAppEnum.CONFIGURACOES_EQUIPISTA },
  { titulo: "Manutenção de equipistas" }
]

export function ManutencaoEquipista() {
  const location = useLocation()
  const navigate = useNavigate()

  const equipistaId: number | undefined = location.state?.id

  const form = useForm<EquipistaReqDto>({ resolver: zodResolver(equipistaFormSchema) })

  async function fetchDadosIniciais(equipeId?: number) {
    if (!equipeId) return

    try {
      const equipe = await equipistaService.findById(equipeId)
      form.reset(equipe as unknown as EquipistaReqDto)
    } catch (error) {
      ErroUtil.tratar(error)
    }
  }

  async function criarEquipe(data: EquipistaReqDto) {
    const toastId = toastService.loading("Criando equipe")

    try {
      await equipistaService.save(data)
      await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })

      toastService.update(toastId, { render: "Sucesso ao criar equipe", type: "success" })
      navigate(RotasAppEnum.CONFIGURACOES_EQUIPISTA)
    } catch (error) {
      ErroUtil.tratar(error)
      toastService.update(toastId, { render: "Erro ao criar equipe", type: "error" })
    }
  }

  async function atualizarEquipe(data: EquipistaReqDto) {
    const toastId = toastService.loading("Atualizando equipe")

    try {
      await equipistaService.update(data.id!, data)
      await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })

      navigate(RotasAppEnum.CONFIGURACOES_EQUIPISTA)
      toastService.update(toastId, { render: "Sucesso ao atualizar equipe", type: "success" })
    } catch (error) {
      ErroUtil.tratar(error)
      toastService.update(toastId, { render: "Erro ao atualizar equipe", type: "error" })
    }
  }

  async function onSubmit(data: EquipistaReqDto) {
    if (data.id) await atualizarEquipe(data)
    else await criarEquipe(data)

    await queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
  }

  useQuery({
    queryKey: [RotasApiEnum.EQUIPE],
    queryFn: async () => await fetchDadosIniciais(equipistaId),
    enabled: !!equipistaId
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-neutral-800 p-5 rounded-md space-y-8"
        >
          <CadastrosBasicos />

          <EnderecoEquipistaForm />

          <AreaAtuacaoFrom />

          <ExtrasEquipistaForm />

          <FormFooter
            isEdicao={!!equipistaId}
            href={RotasAppEnum.CONFIGURACOES_EQUIPISTA}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>

        <DevTool control={form.control} />
      </Form>
    </ContainerPage>
  )
}