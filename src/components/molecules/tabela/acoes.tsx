import { IChildren } from "@/types/components/IChildren";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Alerta } from "./alerta-deletar";

interface AcoesProps extends Partial<IChildren> {
  id: number
  href: RotasAppEnum
  callback: () => unknown
  mensagem?: string
  state?: { [key: string]: unknown }
}

export function Acoes(props: Readonly<AcoesProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function onCloseAlerta() {
    setIsOpen(false)
  }

  function onConfirmar() {
    props.callback()
    onCloseAlerta()
  }

  function handleIsOpen(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  return (
    <section className="flex items-center gap-2">
      <Alerta
        isOpen={isOpen}
        onConfirmar={onConfirmar}
        onOpenChange={handleIsOpen}
        mensagem={props.mensagem}
      />

      {props.children}

      <Link to={props.href} state={{ id: props.id, ...props.state }}>
        <Button variant="ghost" size="icon">
          <Edit />
        </Button>
      </Link>

      <Button variant="ghost" size="icon"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 />
      </Button>
    </section>
  );
};