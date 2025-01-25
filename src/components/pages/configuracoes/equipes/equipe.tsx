import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { Acoes } from "@/components/molecules/tabela/acoes";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { queryClient } from "@/lib/useQuery/query-client";
import { toastService } from "@/lib/useQuery/toast-service";
import { equipeService } from "@/services/equipe-service";
import { EquipeResDto } from "@/types/dtos/services/equipe";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Equipes" }
]

export function Equipe() {
  const { data: dadosTabela, isFetching } = useQuery({
    queryKey: [RotasApiEnum.EQUIPE],
    queryFn: async () => await equipeService.findAll()
  })

  const removerEquipeMutation = useMutation({
    mutationKey: [RotasApiEnum.EQUIPE],
    mutationFn: function (id: number) {
      return equipeService.delete(id)
    },
    onMutate: async (id: number) => {
      toastService.loading("Removendo equipe", { toastId: id, autoClose: 5000 })
      return { toastId: id }
    },
    onSuccess: (...{ "2": { toastId } }) => {
      queryClient.invalidateQueries({ queryKey: [RotasApiEnum.EQUIPE] })
      toastService.update(toastId, { render: "Sucesso ao criar equipe", type: "success" })
    },
    onError: (...{ "2": context }) => {
      toastService.update(context?.toastId ?? "", { render: "Erro ao remover equipe", type: "error" })
    }
  })

  const colunasTabela: ColumnDef<EquipeResDto>[] = [
    { accessorKey: "equipe", header: "Nome" },
    {
      accessorKey: "arquivo",
      header: "Arquivo",
      cell: (info) => info.getValue() ? "Sim" : "Não"
    },
    {
      accessorKey: undefined,
      header: "Ações",
      cell: ({ row }) => {
        const equipeId = row.original.id;
        const nomeEquipe = row.original.equipe;

        return (
          <Acoes
            id={equipeId}
            href={RotasAppEnum.CONFIGURACOES_EQUIPE_MANUTENCAO}
            callback={() => {
              toastService.loading("Removendo equipe", { toastId: equipeId })
              removerEquipeMutation.mutate(equipeId)
            }}
            mensagem={`Você deseja remover permanentimente o encontro "${nomeEquipe}"`}
          />)
      },
    }
  ]

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de Equipes" >
        <DataTable<EquipeResDto>
          data={dadosTabela}
          columns={colunasTabela}
          isFetching={isFetching}
          href={RotasAppEnum.CONFIGURACOES_EQUIPE_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}