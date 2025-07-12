import { Breadcrumb, BreadcrumbListType } from "@/components/atoms/breadcrumb"

const listaItensBreadcrumb: BreadcrumbListType[] = [{ titulo: "Home" }]

export function Home() {
	return (
		<div className='flex flex-1 flex-col w-full gap-4'>
			<Breadcrumb listaItens={listaItensBreadcrumb} />
		</div>
	)
}
