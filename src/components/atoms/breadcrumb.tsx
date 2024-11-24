import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { useId } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbShadcn } from "../ui/breadcrumb";

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
              <Fragment>
                <BreadcrumbItem key={item.href + useId()}>
                  <Link to={item.href}>
                    <BreadcrumbLink>{item.titulo}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
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