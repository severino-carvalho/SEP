import { ContainerPage } from "@/components/layouts/container-page";
import { ListagemLayout } from "@/components/layouts/listagem-layout";
import { BreadcrumbListType } from "@/components/ui/breadcrumb";
import { UsuarioResDto } from "@/types/dtos/services/encontro/usuario-res.dto";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../../data-table";

const colunasDataTable: ColumnDef<UsuarioResDto>[] = [
  { accessorKey: "nome", },
  { accessorKey: "email" },
]

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Usuários" }
]

export function Usuario() {
  const { data: dadosDataTable } = useQuery({
    queryKey: [""], queryFn: () => {
      return [] as UsuarioResDto[]
    }
  })

  return (
    <ContainerPage className="gap-10">
      <ListagemLayout listaItensBreadcrumb={listaItensBreadcrumb}>
        <div className="flex flex-col flex-1 gap-5">
          <h1 className="text-3xl">Listagem de Usuários</h1>

          <div className="flex flex-col gap-5">
            <DataTable<UsuarioResDto>
              columns={colunasDataTable}
              data={dadosDataTable}
            />
          </div>
        </div>
      </ListagemLayout>
    </ContainerPage>
  )
}