import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { useId } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbShadcn } from "../ui/breadcrumb";

export type BreadcrumbListType = {
  titulo: string
  href?: RotasAppEnum
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
              <Fragment key={item.href + useId()}>
                <BreadcrumbItem key={item.href + useId()}>
                  <Link className="transition-colors hover:text-foreground" to={item.href}>
                    {item.titulo}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            )
          }

          return (
            <BreadcrumbItem key={item.href + useId()}>
              <BreadcrumbPage>{item.titulo}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbShadcn>
  )
}