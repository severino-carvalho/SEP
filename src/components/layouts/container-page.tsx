import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type ContainerPageProps = ComponentProps<'div'>

export function ContainerPage(props: Readonly<ContainerPageProps>) {
  return (
    <div className={cn("flex flex-col flex-1", props.className)}>
      {props.children}
    </div>
  )
}