import { cn } from "@/lib/utils";
import { IChildren } from "@/types/components/IChildren";
import { ComponentProps } from "react";

type ContainerLayoutType = IChildren & ComponentProps<'div'>

export function ContainerLayout(props: Readonly<ContainerLayoutType>) {
  return (
    <div className={cn("flex flex-col flex-1 w-full px-10 pt-8", props.className)}>{props.children}</div>
  )
}