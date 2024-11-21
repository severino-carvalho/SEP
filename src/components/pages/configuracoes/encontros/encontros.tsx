import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { EncontroResDto } from "@/types/dtos/services/encontro";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Entrontros" }
]

const colunasTabela: ColumnDef<EncontroResDto>[] = [
  { accessorKey: "nome", },
  { accessorKey: "email" },
]

export function Encontro() {
  const { data: dadosTabela } = useQuery({
    queryKey: [""], queryFn: () => {
      return [] as EncontroResDto[]
    }
  })

  return (
    <ContainerPage
      className="gap-10"
      listaItensBreadcrumb={listaItensBreadcrumb}
    >
      <ListagemLayout tituloPage="Listagem de Encontros" >
        <DataTable<EncontroResDto>
          data={dadosTabela}
          columns={colunasTabela}
          href={RotasEnum.CONFIGURACOES_ENCONTRO_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}