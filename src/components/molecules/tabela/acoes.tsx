import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { Download, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { Alerta } from "./alerta-deletar";

type AcoesType = {
  id: number
  href: RotasAppEnum
  callback: () => any
  mensagem?: string
}

export function Acoes(props: AcoesType) {
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

  function handleDownload() {
    // Criar lógica para realizar o download do arquivo
  }

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" onClick={handleDownload}>
        <Download />
      </Button>

      <Link to={props.href} state={{ id: props.id }}>
        <Button variant="ghost" size="icon">
          <Edit />
        </Button>
      </Link>

      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Trash2 />
      </Button>

      <Alerta
        isOpen={isOpen}
        onConfirmar={onConfirmar}
        onOpenChange={handleIsOpen}
        mensagem={props.mensagem}
      />
    </div>
  );
};