import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { queryClient } from "@/lib/useQuery/query-client";
import { toastService } from "@/lib/useQuery/toast-service";
import { equipeService } from "@/services/equipe-service";
import { equipistaService } from "@/services/equipista-service";
import { EquipistaResDto } from "@/types/dtos/services/equipista";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { montarColunasEquipistas } from "./utils/montar-colunas-equipistas";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Equipistas" }
]

export function Equipista() {
  async function buscarEquipistas() {
    try {
      return await equipistaService.findAll()
    } catch (error) {
      console.error(error)
      toastService.erro("Erro ao buscar equipistas")
      return []
    }
  }

  const { data: dadosTabela, isFetching } = useQuery({
    queryKey: [RotasApiEnum.EQUIPISTA],
    queryFn: async () => await buscarEquipistas()
  })

  async function removerEquipe(id: number) {
    const toastId = toastService.loading("Removendo equipe")

    try {
      await equipeService.delete(id)
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPISTA] })
      toastService.update(toastId, { render: "Sucesso ao remover equipe", type: "success" })
    } catch (error) {
      console.error(error)
      toastService.update(toastId, { render: "Erro ao remover equipe", type: "error" })
    }
  }

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de equipistas">
        <DataTable<EquipistaResDto>
          data={dadosTabela}
          isFetching={isFetching}
          columns={montarColunasEquipistas(removerEquipe)}
          href={RotasAppEnum.CONFIGURACOES_EQUIPISTA_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}