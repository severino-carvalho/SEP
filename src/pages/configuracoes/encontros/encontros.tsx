import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { Acoes } from "@/components/molecules/tabela/acoes";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { queryClient } from "@/lib/useQuery/query-client";
import { toastService } from "@/lib/useQuery/toast-service";
import { encontroService } from "@/services/encontro-service";
import { EncontroResDto } from "@/types/dtos/services/encontro";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Encontros" }
]

export function Encontro() {
  async function onDeletarEncontro(encontroId: number) {
    const toastId = toastService.loading("Removendo encontro")

    await encontroService.delete(encontroId).then(() => {
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.ENCONTROS] })
      toastService.update(toastId, { render: "Encontro removido com sucesso", type: "success" })
    }).catch(() => toastService.update(toastId, { render: "Erro ao remover encontro", type: "error" }))
  }

  async function loadEncontros() {
    const { content } = await encontroService.findAll();
    return content;
  }

  const { data: dadosTabela, isFetching } = useQuery({
    queryKey: [RotasApiEnum.ENCONTROS],
    queryFn: async () => await loadEncontros()
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
          data={dadosTabela}
          columns={colunasTabela}
          isFetching={isFetching}
          href={RotasAppEnum.CONFIGURACOES_ENCONTRO_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}