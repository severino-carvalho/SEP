import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { Acoes } from "@/components/molecules/tabela/acoes";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { ErroUtil } from "@/lib/erros/erro-util";
import { queryClient } from "@/lib/useQuery/query-client";
import { toastService } from "@/lib/useQuery/toast-service";
import { encontroService } from "@/services/encontro-service";
import { FiltroPaginacao } from "@/types/dtos/filter";
import { EncontroResDto } from "@/types/dtos/services/encontro";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Encontros" }
]

export function Encontro() {
  const [pageable, setPageable] = useState<FiltroPaginacao>({ page: 0, size: 1, filters: [] });
  async function onDeletarEncontro(encontroId: number) {
    const toastId = toastService.loading("Removendo encontro")

    await encontroService.delete(encontroId).then(() => {
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.ENCONTROS] })
      toastService.update(toastId, { render: "Encontro removido com sucesso", type: "success" })
    }).catch(() => toastService.update(toastId, { render: "Erro ao remover encontro", type: "error" }))
  }

  async function buscarEncontros() {
    try {
      return await encontroService.findPageable(pageable)
    } catch {
      ErroUtil.tratar("Erro ao buscar encontros")
      return undefined
    }
  }

  const { data: dadosTabela, isFetching } = useQuery({
    queryKey: [RotasApiEnum.ENCONTROS, pageable],
    queryFn: buscarEncontros
  })

  const colunasTabela: ColumnDef<EncontroResDto>[] = [
    { accessorKey: "nome", header: "Nome" },
    {
      accessorKey: undefined,
      header: "Ações",
      cell: ({ row }) => {
        const encontroId = row.original.id;
        const nomeEncontro = row.original.nome;

        return (
          <Acoes
            id={encontroId}
            href={RotasAppEnum.CONFIGURACOES_ENCONTRO_MANUTENCAO}
            callback={async () => await onDeletarEncontro(encontroId)}
            mensagem={`Você deseja remover permanentimente o encontro "${nomeEncontro}"`}
          />)
      },
    }
  ]

  return (
    <ContainerPage
      className="gap-10"
      listaItensBreadcrumb={listaItensBreadcrumb}
    >
      <ListagemLayout tituloPage="Listagem de encontros" >
        <DataTable<EncontroResDto>
          paginationData={dadosTabela}
          pageable={pageable}
          onPageableChange={setPageable}
          columns={colunasTabela}
          isFetching={isFetching}
          href={RotasAppEnum.CONFIGURACOES_ENCONTRO_MANUTENCAO}
          searchPlaceholder="Buscar por nome..."
          searchAttribute="nome"
        />
      </ListagemLayout>
    </ContainerPage>
  )
}