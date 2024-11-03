import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { Link } from "react-router-dom";

export function Encontro() {
  return (
    <div>
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
            <BreadcrumbPage>Encontros</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}