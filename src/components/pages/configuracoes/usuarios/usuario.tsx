import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { UsuarioResDto } from "@/types/dtos/services/encontro/usuario-res.dto";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Usuários" }
]

const colunasTabela: ColumnDef<UsuarioResDto>[] = [
  { accessorKey: "nome", },
  { accessorKey: "email" },
]

export function Usuario() {
  const { data: dadosTabela } = useQuery({
    queryKey: [""], queryFn: () => {
      return [] as UsuarioResDto[]
    }
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de Usuários">
        <DataTable<UsuarioResDto>
          columns={colunasTabela}
          data={dadosTabela}
          href={RotasEnum.CONFIGURACOES_USUARIO_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}