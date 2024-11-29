import { Button, ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean
}

export function ButtonLoading({ isLoading, children, ...props }: ButtonLoadingProps) {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  )
}
