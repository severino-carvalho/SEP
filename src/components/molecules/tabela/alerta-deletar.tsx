import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

type AlertaDeletarType = {
  isOpen: boolean
  onConfirmar: () => void
  onOpenChange: (isOpen: boolean) => void
  mensagem?: string
}

export function Alerta(props: AlertaDeletarType) {
  if (!props.isOpen) return;

  return (
    <AlertDialog defaultOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            {
              !!props.mensagem ? (<span>
                {props.mensagem}
              </span>) : (<span>
                Você deseja remover permanentimente
              </span>)
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={props.onConfirmar}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}