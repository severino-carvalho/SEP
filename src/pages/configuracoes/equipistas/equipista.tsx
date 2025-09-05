import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { ErroUtil } from "@/lib/erros/erro-util";
import { queryClient } from "@/lib/useQuery/query-client";
import { toastService } from "@/lib/useQuery/toast-service";
import { equipistaService } from "@/services/equipista-service";
import { FiltroPaginacao } from "@/types/dtos/filter";
import { EquipistaResDto } from "@/types/dtos/services/equipista";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { montarColunasEquipistas } from "./utils/montar-colunas-equipistas";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Equipistas" }
]

export function Equipista() {
  const [pageable, setPageable] = useState<FiltroPaginacao>({ page: 0, size: 1, filters: [] });

  async function buscarEquipistas() {
    try {
      return await equipistaService.findPageable(pageable)
    } catch {
      ErroUtil.tratar("Erro ao buscar equipistas")
      return undefined
    }
  }

  async function removerEquipe(id: number) {
    const toastId = toastService.loading("Removendo equipista")

    try {
      await equipistaService.delete(id)
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPISTA] })
      toastService.update(toastId, { render: "Sucesso ao remover equipista", type: "success" })
    } catch (error) {
      console.error(error)
      toastService.update(toastId, { render: "Erro ao remover equipista", type: "error" })
    }
  }

  const { data: dadosTabela, isFetching } = useQuery({
    queryKey: [RotasApiEnum.EQUIPISTA, pageable],
    queryFn: buscarEquipistas
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de equipistas">
        <DataTable<EquipistaResDto>
          paginationData={dadosTabela}
          pageable={pageable}
          onPageableChange={setPageable}
          isFetching={isFetching}
          columns={montarColunasEquipistas(removerEquipe)}
          href={RotasAppEnum.CONFIGURACOES_EQUIPISTA_MANUTENCAO}
          searchPlaceholder="Buscar por nome..."
          searchAttribute="nome"
        />
      </ListagemLayout>
    </ContainerPage>
  )
}