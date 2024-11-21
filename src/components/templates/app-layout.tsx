import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { IChildren } from '@/types/components/IChildren'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ContainerLayout } from './container-layout'

export default function AppLayout({ children }: Readonly<Partial<IChildren>>) {
	const [sidebarOpen, setSidebarOpen] = useState(true)

	function handleSidebarOpen() {
		setSidebarOpen(isOpen => !isOpen)
	}

	return (
		<SidebarProvider
			defaultOpen={true}
			open={sidebarOpen}
			onOpenChange={handleSidebarOpen}
		>
			<AppSidebar open={sidebarOpen} />

			<ContainerLayout>
				<main className='flex flex-col w-full min-h-full'>
					{children}
					<Outlet />
				</main>
			</ContainerLayout>
		</SidebarProvider>
	)
}
