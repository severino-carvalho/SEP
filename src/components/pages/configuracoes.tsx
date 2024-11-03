import { RotasEnum } from "@/types/enums/RotasEnum";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export function Configuracoes() {


  return (
    <div className="flex flex-col w-full flex-1 gap-10">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={RotasEnum.HOME}>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Configurações</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-1 flex-col w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl w-1/3">Configurações</h2>
          <p className="text-sm">Escolha uma das configuracoes para poder gerenciar</p>
        </div>

        <section className="flex  ">
          <div className="w-1/3">
            <span className="text-gray-200">Gerais</span>
            <ul className="flex flex-col ">
              <li className="text-neutral-400">Perfis</li>
              <li className="text-neutral-400">Usuários</li>
            </ul>
          </div>

          <div className="w-1/3">
            <span className="text-gray-200">Gerais</span>
            <ul className="flex flex-col ">
              <li className="text-neutral-400">Perfis</li>
              <li className="text-neutral-400">Usuários</li>
            </ul>
          </div>

          <div className="w-1/3">
            <span className="text-gray-200">Gerais</span>
            <ul className="flex flex-col ">
              <li className="text-neutral-400">Perfis</li>
              <li className="text-neutral-400">Usuários</li>
            </ul>
          </div>

          <div className="w-1/3">
            <span className="text-gray-200">Gerais</span>
            <ul className="flex flex-col ">
              <li className="text-neutral-400">Perfis</li>
              <li className="text-neutral-400">Usuários</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}