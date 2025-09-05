import { BreadcrumbListType } from "@/components/atoms/breadcrumb"
import { FormFooter } from "@/components/molecules/form/form-footer"
import { FormInputFile } from "@/components/molecules/form/form-input-file"
import { ContainerPage } from "@/components/templates/container-page"
import { Form, FormField } from "@/components/ui/form"
import { ErroUtil } from "@/lib/erros/erro-util"
import { toastService } from "@/lib/useQuery/toast-service"
import { equipistaService } from "@/services/equipista-service"
import { EquipistaReqDto } from "@/types/dtos/services/equipista"
import { EEstadoCivil, EFormacao, EOcupacao, EProfissao, ESacramento, ETipoParticipacao } from "@/types/enums/app"
import { RotasApiEnum } from "@/types/enums/rotas-api-enum"
import { RotasAppEnum } from "@/types/enums/rotas-app-enum"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
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

  const form = useForm<EquipistaReqDto>({
    resolver: zodResolver(equipistaFormSchema),
    defaultValues: {
      idPastorais: [],
      participacoesEncontro: [],
      endereco: { logradouro: '', cep: '', numero: '', bairro: '', cidade: '', estado: '', complemento: '' },
      areaAtuacao: { formacao: '', ocupacao: '', profissao: '', habilidades: '' }
    }
  })

  function getEnumKeyByValue<T extends Record<string, string>>(enumObj: T, value: string): keyof T | undefined {
    return Object.keys(enumObj).find(key => key === value) as keyof T | undefined;
  }

  async function fetchDadosIniciais(equipeId?: number) {
    if (!equipeId) return

    try {
      const equipista = await equipistaService.findById(equipeId)

      const dadosFormatados = {
        ...equipista,
        dataNascimento: equipista.dataNascimento ? new Date(equipista.dataNascimento + 'T00:00:00') : undefined,
        sacramento: equipista.sacramento ? getEnumKeyByValue(ESacramento, equipista.sacramento) : undefined,
        estadoCivil: getEnumKeyByValue(EEstadoCivil, equipista.estadoCivil),
        filhos: equipista.filhos?.toString(),
        endereco: equipista.enderecoDTO ? {
          cep: equipista.enderecoDTO.cep?.replace('-', ''),
          logradouro: equipista.enderecoDTO.logradouro,
          numero: equipista.enderecoDTO.numero,
          complemento: equipista.enderecoDTO.complemento,
          bairro: equipista.enderecoDTO.bairro,
          cidade: equipista.enderecoDTO.cidade,
          estado: equipista.enderecoDTO.estado
        } : undefined,
        areaAtuacao: equipista.areaAtuacaoDTO ? {
          formacao: getEnumKeyByValue(EFormacao, equipista.areaAtuacaoDTO.formacao),
          ocupacao: getEnumKeyByValue(EOcupacao, equipista.areaAtuacaoDTO.ocupacao),
          profissao: getEnumKeyByValue(EProfissao, equipista.areaAtuacaoDTO.profissao),
          habilidades: equipista.areaAtuacaoDTO.habilidades
        } : undefined,
        idPastorais: equipista.pastorais ? equipista.pastorais.map(p => p.id) : [],
        participacoesEncontro: equipista.participacoesEncontro ? equipista.participacoesEncontro.map(p => ({
          idEquipe: p.idEquipe,
          ano: p.ano ?? new Date().getFullYear(),
          tipoParticipacao: getEnumKeyByValue(ETipoParticipacao, p.tipoParticipacao)
        })) : [],
        fileData: []
      }

      form.reset(dadosFormatados as unknown as EquipistaReqDto)
    } catch (error) {
      ErroUtil.tratar(error)
    }
  }

  async function criarEquipe(data: EquipistaReqDto) {
    const toastId = toastService.loading("Criando equipista")

    try {
      await equipistaService.save(data)

      toastService.update(toastId, { render: "Sucesso ao criar equipista", type: "success" })
      navigate(RotasAppEnum.CONFIGURACOES_EQUIPISTA)
    } catch (error) {
      ErroUtil.tratar(error)
      toastService.update(toastId, { render: "Erro ao criar equipista", type: "error" })
    }
  }

  async function atualizarEquipe(data: EquipistaReqDto) {
    const toastId = toastService.loading("Atualizando equipista")

    try {
      await equipistaService.update(data.id!, data)

      navigate(RotasAppEnum.CONFIGURACOES_EQUIPISTA)
      toastService.update(toastId, { render: "Sucesso ao atualizar equipista", type: "success" })
    } catch (error) {
      ErroUtil.tratar(error)
      toastService.update(toastId, { render: "Erro ao atualizar equipista", type: "error" })
    }
  }

  async function onSubmit(data: EquipistaReqDto) {
    if (data.id) await atualizarEquipe(data)
    else await criarEquipe(data)
  }

  useQuery({
    queryKey: [RotasApiEnum.EQUIPISTA],
    queryFn: async () => await fetchDadosIniciais(equipistaId),
    enabled: !!equipistaId
  })

  useEffect(() => {
    console.log("ERROS FORM", form.formState.errors)
  }, [form.formState.errors])

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border border-neutral-800 p-6 rounded-md space-y-10"
        >
          <CadastrosBasicos />

          <hr className="border-neutral-700" />

          <EnderecoEquipistaForm />

          <hr className="border-neutral-700" />

          <AreaAtuacaoFrom />

          <hr className="border-neutral-700" />

          <ExtrasEquipistaForm />

          <FormField
            name="arquivo"
            control={form.control}
            render={({ field }) => (
              <FormInputFile
                field={field}
                label="Anexar arquivo (opcional)"
                descricao="Selecione um arquivo para anexar ao cadastro do equipista."
                accept="application/pdf,image/*,.doc,.docx"
              />
            )}
          />

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