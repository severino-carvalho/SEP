import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { FormState } from "react-hook-form";
import { Link } from "react-router-dom";

interface FormFooterProps extends ComponentProps<'div'>, Partial<FormState<never>> {
  href: string
  isEdicao?: boolean
}

/**
 * @property href - url para o caso de cancelamento
 */
export function FormFooter({ href, isEdicao = false, isSubmitting, ...props }: FormFooterProps) {
  return (
    <div {...props} className={cn("flex gap-2.5", props.className)}>
      <Button type="submit" disabled={isSubmitting}>
        {isEdicao ? "Atualizar" : "Adicionar"}
      </Button>

      <Link to={href}>
        <Button type="button" variant="outline">Cancelar</Button>
      </Link>
    </div>
  )
}