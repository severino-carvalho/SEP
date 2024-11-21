import { BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { ContainerPage } from "@/components/templates/container-page";
import { RotasEnum } from "@/types/enums/rotas-app-enum";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
  { titulo: "Configurações", href: RotasEnum.CONFIGURACOES },
  { titulo: "Pastas", href: RotasEnum.CONFIGURACOES_PASTA },
  { titulo: "Manutenção de pastas" }
]

export function ManutencaoPastas() {
  return (
    <ContainerPage className="gap-10" listaItensBreadcrumb={listaItensBreadcrumb}>

    </ContainerPage>
  )
}