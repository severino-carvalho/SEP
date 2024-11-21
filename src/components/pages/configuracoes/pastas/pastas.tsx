import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { PastaResDto } from "@/types/dtos/services/pasta";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Pastas" }
]

const colunasTabela: ColumnDef<PastaResDto>[] = [
  { accessorKey: "nome", },
  { accessorKey: "email" },
]

export function Pasta() {
  const { data: dadosTabela } = useQuery({
    queryKey: [""], queryFn: () => {
      return [] as PastaResDto[]
    }
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de Pastas" >
        <DataTable<PastaResDto>
          data={dadosTabela}
          columns={colunasTabela}
          href={RotasEnum.CONFIGURACOES_PASTA_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}