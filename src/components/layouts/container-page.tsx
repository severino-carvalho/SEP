import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { Breadcrumb, BreadcrumbListType } from "../ui/breadcrumb"

type ContainerPageProps = ComponentProps<'div'> & {
  listaItensBreadcrumb: BreadcrumbListType[]
}

export function ContainerPage(props: Readonly<ContainerPageProps>) {

  return (
    <div className={cn("flex flex-col flex-1 gap-5", props.className)}>
      <Breadcrumb listaItens={props.listaItensBreadcrumb} />

      {props.children}
    </div>
  )
}