import { Breadcrumb, BreadcrumbListType } from '../atoms/breadcrumb'

const listaItensBreadcrumb: BreadcrumbListType[] = [{ titulo: "Sobre" }]

export function About() {
	return (
		<div className='flex flex-1 flex-col w-full gap-4'>
			<Breadcrumb listaItens={listaItensBreadcrumb} />

			<div className='flex flex-1 gap-4'>
				<div className='flex flex-1 bg-zinc-900 rounded-lg' />
				<div className='flex flex-1 bg-zinc-900 rounded-lg' />
			</div>
		</div>
	)
}
