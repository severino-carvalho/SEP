import { ListagemLayout } from "@/components/layouts/listagem-layout";
import { BreadcrumbListType } from "@/components/ui/breadcrumb";
import { RotasEnum } from "@/types/enums/rotas-app-enum";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Entrontros" }
]

export function Encontro() {
  return (
    <ListagemLayout listaItensBreadcrumb={listaItensBreadcrumb}>

    </ListagemLayout>
  )
}