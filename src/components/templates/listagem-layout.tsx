import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

type ListagemLayoutProps = ComponentProps<'div'> & {
  tituloPage: string
}

/**
 * @component
 * @param {Object} props - O componente aceita um objeto de propriedades
 * @param {string} tituloPage - Para ser exibido no título da seção 
 * @param {BreadcrumbListType} listaItensBreadcrumb - Uma estrutura para renderização do breadcrumb
 * @param {TableConfigType} tableConfig - Uma estrutura para renderização dos dados da tabela
 * @author Severino Carvalho
 * @returns {JSX.Element} A renderização de um layout para seções de listagens.
 * @example
 * // Renderiza o layout de uma página de listagem
 * <ListagemLayout 
 *  tituloPage="Listagem de ..." 
 *  listaItensBreadcrumb={listaItensBreadcrumb} 
 *  tableConfig={tableConfig}
 * />
 */
export function ListagemLayout(props: Readonly<ListagemLayoutProps>) {
  return (
    <section className={cn("flex flex-col flex-1 gap-5", props.className)}>
      <div className="flex flex-col flex-1 gap-5">
        <h1 className="text-4xl font-medium">{props.tituloPage}</h1>

        {props.children}
      </div>
    </section>
  )
}