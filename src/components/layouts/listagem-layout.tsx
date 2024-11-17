import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { Breadcrumb, BreadcrumbListType } from "../ui/breadcrumb"

type ListagemLayoutProps = ComponentProps<'div'> & {
  listaItensBreadcrumb: BreadcrumbListType[]
}

export function ListagemLayout(props: Readonly<ListagemLayoutProps>) {
  return (
    <div className={cn("flex flex-col flex-1", props.className)}>
      <Breadcrumb listaItens={props.listaItensBreadcrumb} />

      {props.children}
    </div>
  )
}