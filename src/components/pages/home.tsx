import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage
} from '../ui/breadcrumb'

export function Home() {
	return (
		<div className='flex flex-1 flex-col w-full p-6 gap-4'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbPage>Home</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className='flex flex-1 gap-4'>
				<div className='flex flex-col flex-1 gap-4 rounded-lg'>
					<div className='flex flex-1 bg-zinc-900 rounded-lg' />
					<div className='flex flex-1 bg-zinc-900 rounded-lg' />
				</div>

				<div className='flex flex-1 w-1/2 bg-zinc-900 rounded-lg' />

				<div className='flex flex-col flex-1 gap-4 rounded-lg'>
					<div className='flex flex-1 bg-zinc-900 rounded-lg' />
					<div className='flex flex-1 bg-zinc-900 rounded-lg' />
					<div className='flex flex-1 bg-zinc-900 rounded-lg' />
				</div>
			</div>
		</div>
	)
}
