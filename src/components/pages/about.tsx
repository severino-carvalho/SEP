import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from '../ui/breadcrumb'

export function About() {
	return (
		<main className='flex flex-col w-full p-6 gap-4'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>About</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className='flex flex-1 gap-4'>
				<div className='flex flex-1 bg-zinc-900 rounded-lg' />
				<div className='flex flex-1 bg-zinc-900 rounded-lg' />
			</div>
		</main>
	)
}
