import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { Acoes } from "@/components/molecules/tabela/acoes";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { Button } from "@/components/ui/button";
import { gerarLinkDownload } from "@/lib/download";
import { ErroUtil } from "@/lib/erros/erro-util";
import { queryClient } from "@/lib/useQuery/query-client";
import { toastService } from "@/lib/useQuery/toast-service";
import { equipeService } from "@/services/equipe-service";
import { FiltroPaginacao } from "@/types/dtos/filter";
import { EquipeResDto } from "@/types/dtos/services/equipe";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Equipes" }
]

export function Equipe() {
  const [pageable, setPageable] = useState<FiltroPaginacao>({ page: 0, size: 1, filters: [] });
  async function downloadPasta(pastaId: number) {
    const toastId = toastService.loading("Baixando pasta")

    await equipeService.downloadPasta(pastaId)
      .then((pasta) => {
        gerarLinkDownload(pasta)
        toastService.update(toastId, { render: "Sucesso ao baixar pasta", type: "success" })
      })
      .catch(() => toastService.update(toastId, { render: "Erro ao baixar pasta", type: "error" }))
  }

  async function removerEquipe(id: number) {
    const toastId = toastService.loading("Removendo equipe")

    await equipeService.delete(id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
        toastService.update(toastId, { render: "Sucesso ao remover equipe", type: "success" })
      })
      .catch(() => toastService.update(toastId, { render: "Erro ao remover equipe", type: "error" }))
  }

  async function buscarEquipes() {
    try {
      return await equipeService.findPageable(pageable)
    } catch {
      ErroUtil.tratar("Erro ao buscar equipes")
      return undefined
    }
  }

  const { data: dadosTabela, isFetching } = useQuery({
    queryKey: [RotasApiEnum.EQUIPE, pageable],
    queryFn: buscarEquipes
  })

  const colunasTabela: ColumnDef<EquipeResDto>[] = [
    { accessorKey: "nome", header: "Nome" },
    {
      accessorKey: "pasta",
      header: "Pasta",
      cell: (info) => info.getValue() ? "Sim" : "Não"
    },
    {
      accessorKey: undefined,
      header: "Ações",
      cell: ({ row }) => {
        const equipeId = row.original.id;
        const nomeEquipe = row.original.nome;
        const arquivoId = row.original.id;

        return (
          <Acoes
            id={equipeId}
            state={{ arquivoId }}
            href={RotasAppEnum.CONFIGURACOES_EQUIPE_MANUTENCAO}
            callback={async () => removerEquipe(equipeId)}
            mensagem={`Você deseja remover permanentimente o encontro "${nomeEquipe}"`}
          >
            <Fragment>
              {arquivoId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => downloadPasta(arquivoId)}
                  aria-label="Baixar pasta"
                >
                  <Download />
                </Button>
              )}
            </Fragment>
          </Acoes>)
      },
    }
  ]

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de equipes" >
        <DataTable<EquipeResDto>
          paginationData={dadosTabela}
          pageable={pageable}
          onPageableChange={setPageable}
          columns={colunasTabela}
          isFetching={isFetching}
          href={RotasAppEnum.CONFIGURACOES_EQUIPE_MANUTENCAO}
          searchPlaceholder="Buscar por nome..."
          searchAttribute="nome"
        />
      </ListagemLayout>
    </ContainerPage>
  )
}