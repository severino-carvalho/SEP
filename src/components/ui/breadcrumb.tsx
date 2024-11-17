import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { Link } from "react-router-dom";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbShadcn } from "./shadcn/breadcrumb";

export type BreadcrumbListType = {
  titulo: string
  href?: RotasEnum
}

type BreadcrumbType = {
  listaItens: BreadcrumbListType[]
}

export function Breadcrumb({ listaItens }: Readonly<BreadcrumbType>) {
  return (
    <BreadcrumbShadcn>
      <BreadcrumbList>
        {listaItens.map(item => {
          if (!!item.href) {
            return (
              <>
                <BreadcrumbItem>
                  <Link to={item.href}>
                    <BreadcrumbLink>{item.titulo}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )
          }

          return (
            <BreadcrumbItem>
              <BreadcrumbPage>{item.titulo}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbShadcn>
  )
}