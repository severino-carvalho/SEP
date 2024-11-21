import { Breadcrumb, BreadcrumbListType } from "@/components/atoms/breadcrumb";
import { RotasEnum } from "@/types/enums/rotas-app-enum";
import { CalendarCog, FolderCog, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader } from "../../ui/card";

const listaItensBreadcrumb: BreadcrumbListType[] = [
  { titulo: "Home", href: RotasEnum.HOME },
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

        <section className="flex flex-wrap gap-10">
          <Link to={RotasEnum.CONFIGURACOES_USUARIO} className="w-1/4 cursor-pointer">
            <Card className="flex flex-col h-full hover:bg-sidebar">
              <CardHeader>
                <UserRoundCog />
              </CardHeader>

              <CardContent>
                <span className="text-gray-200">Usuários</span>
                <CardDescription>Alias nihil dicta dolore ad nobis aspernatur soluta ea</CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to={RotasEnum.CONFIGURACOES_ENCONTRO} className="w-1/4 cursor-pointer h-full">
            <Card className="flex flex-col h-full hover:bg-sidebar">
              <CardHeader>
                <CalendarCog />
              </CardHeader>

              <CardContent>
                <span className="text-gray-200">Encontros</span>
                <CardDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit</CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to={RotasEnum.CONFIGURACOES_PASTA} className="w-1/4 cursor-pointer h-full">
            <Card className="flex flex-col h-full hover:bg-sidebar">
              <CardHeader>
                <FolderCog />
              </CardHeader>

              <CardContent>
                <span className="text-gray-200">Pastas</span>
                <CardDescription>Ab, tempora id! Reprehenderit mollitia atque officiis? Sequi, odit nesciunt</CardDescription>
              </CardContent>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  )
}