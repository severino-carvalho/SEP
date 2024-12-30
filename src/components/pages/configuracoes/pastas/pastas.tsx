import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { Acoes } from "@/components/molecules/tabela/acoes";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { queryClient } from "@/lib/useQuery/query-client";
import { pastaService } from "@/services/pasta-service";
import { PastaResDto } from "@/types/dtos/services/pasta";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Pastas" }
]

export function Pasta() {
  const { data: dadosTabela } = useQuery({
    queryKey: [RotasApiEnum.PASTAS],
    queryFn: async () => await pastaService.findAll()
  })

  async function onDeletarEncontro(encontroId: number) {
    await pastaService.delete(encontroId)
    queryClient.invalidateQueries({ queryKey: [RotasApiEnum.PASTAS] })
  }

  const colunasTabela: ColumnDef<PastaResDto>[] = [
    { accessorKey: "equipe", header: "Nome" },
    {
      accessorKey: "arquivoBase64",
      header: "Arquivo",
      cell: (info) => info.getValue() ? "Sim" : "Não"
    },
    {
      accessorKey: undefined,
      header: "Ações",
      cell: ({ row }) => {
        const pastaId = row.original.id;
        const nomeEquipe = row.original.equipe;

        return (
          <Acoes
            id={pastaId}
            href={RotasAppEnum.CONFIGURACOES_PASTA_MANUTENCAO}
            callback={async () => await onDeletarEncontro(pastaId)}
            mensagem={`Você deseja remover permanentimente o encontro "${nomeEquipe}"`}
          />)
      },
    }
  ]

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de Pastas" >
        <DataTable<PastaResDto>
          data={dadosTabela}
          columns={colunasTabela}
          href={RotasAppEnum.CONFIGURACOES_PASTA_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}