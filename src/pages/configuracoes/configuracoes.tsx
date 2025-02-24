import { Breadcrumb, BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { CardLink } from "@/components/molecules/card-link";
import { RotasAppEnum } from "@/types/enums/rotas-app-enum";
import { CalendarCog, FolderCog, UserRoundCog } from "lucide-react";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasAppEnum.HOME },
  { titulo: "Configurações" },
]

export function Configuracoes() {
  return (
    <div className="flex flex-col w-full flex-1 gap-10">
      <Breadcrumb listaItens={listaItensBreadcrumb} />

      <div className="flex flex-1 flex-col w-full gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl w-1/3">Configurações</h2>
          <p className="text-base">Escolha uma das configuracoes para poder gerenciar</p>
        </div>

        <section className="flex gap-5 justify-between flex-wrap w-full">
          <CardLink
            titulo="Usuários"
            icon={<UserRoundCog />}
            to={RotasAppEnum.CONFIGURACOES_USUARIO}
            className="lg:max-w-1/3 md:max-w-1/2 max-w-1/4 max-h-full flex-1"
            descricao="Gerencie permissões, cadastre novos usuários e ajuste configurações de acesso."
          />

          <CardLink
            titulo="Encontros"
            icon={<CalendarCog />}
            to={RotasAppEnum.CONFIGURACOES_ENCONTRO}
            className="lg:max-w-1/3 md:max-w-1/2 max-w-1/4 max-h-full flex-1"
            descricao="Crie, edite e acompanhe os encontros organizados pela equipe."
          />

          <CardLink
            titulo="Equipes"
            icon={<FolderCog />}
            to={RotasAppEnum.CONFIGURACOES_EQUIPE}
            className="lg:max-w-1/3 md:max-w-1/2 max-w-1/4 max-h-full flex-1"
            descricao="Configure as equipes responsáveis por eventos e atribua funções específicas."
          />

          <CardLink
            titulo="Equipistas"
            icon={<FolderCog />}
            className="lg:max-w-1/3 md:max-w-1/2 max-w-1/4 max-h-full flex-1"
            to={RotasAppEnum.CONFIGURACOES_EQUIPISTA}
            descricao="Gerencie equipistas, atribua funções e ajuste configurações de acesso."
          />
        </section>
      </div>
    </div>
  )
}