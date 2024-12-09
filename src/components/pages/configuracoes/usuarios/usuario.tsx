import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { DataTable } from "@/components/data-table";
import { ContainerPage } from "@/components/templates/container-page";
import { ListagemLayout } from "@/components/templates/listagem-layout";
import { usuarioService } from "@/services/usuario.service";
import { UsuarioResDto } from "@/types/dtos/services/encontro/usuario-res.dto";
import { RotasApiEnum } from "@/types/enums/rotas-api-enum";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações", href: RotasAppEnum.CONFIGURACOES },
  { titulo: "Usuários" }
]

const colunasTabela: ColumnDef<UsuarioResDto>[] = [
  { accessorKey: "nome", },
  { accessorKey: "email" },
]

export function Usuario() {
  const { data: dadosTabela } = useQuery({
    queryKey: [RotasApiEnum.USUARIOS],
    queryFn: async () => await usuarioService.findAll()
  })

  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>
      <ListagemLayout tituloPage="Listagem de Usuários">
        <DataTable<UsuarioResDto>
          columns={colunasTabela}
          data={dadosTabela}
          href={RotasAppEnum.CONFIGURACOES_USUARIO_MANUTENCAO}
        />
      </ListagemLayout>
    </ContainerPage>
  )
}