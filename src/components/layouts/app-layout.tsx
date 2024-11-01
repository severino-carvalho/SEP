import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { IChildren } from '@/types/components/IChildren'
import { useState } from 'react'

export default function AppLayout({ children }: Readonly<IChildren>) {
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

			<main className='flex flex-col w-full min-h-full'>
				{children}
			</main>
		</SidebarProvider>
	)
}
