import { ContainerPage } from "@/components/layouts/container-page";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UsuarioResDto } from "@/types/dtos/services/encontro/usuario-res.dto";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { DataTable } from "../../../data-table";

const colunasDataTable: ColumnDef<UsuarioResDto>[] = [
  { accessorKey: "nome", },
  { accessorKey: "email" },
]

export function Usuario() {
  const { data: dadosDataTable } = useQuery({
    queryKey: [""], queryFn: () => {
      return [] as UsuarioResDto[]
    }
  })

  return (
    <ContainerPage className="gap-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to={RotasEnum.HOME}>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={RotasEnum.CONFIGURACOES}>
              <BreadcrumbLink>Configurações</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Usuários</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col flex-1 gap-5">
        <h1 className="text-3xl">Listagem de Usuários</h1>

        <div className="flex flex-col gap-5">
          <DataTable<UsuarioResDto>
            columns={colunasDataTable}
            data={dadosDataTable}
          />
        </div>
      </div>
    </ContainerPage>
  )
}