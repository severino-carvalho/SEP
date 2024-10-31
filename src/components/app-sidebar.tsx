import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger
} from '@/components/ui/sidebar'
import {
	Calendar,
	ChevronUp,
	Home,
	Inbox,
	Search,
	Settings,
	User2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from './ui/dropdown-menu'

const items = [
	{ title: 'Home', url: '/', icon: Home },
	{ title: 'Inbox', url: '/about', icon: Inbox },
	{ title: 'Calendar', url: '/configuracoes', icon: Calendar },
	{ title: 'Search', url: '/configuracoes', icon: Search },
	{ title: 'Settings', url: '/configuracoes', icon: Settings }
]

export function AppSidebar({ open }: { open?: boolean }) {
	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<SidebarMenu className='flex flex-row items-center justify-between'>
					{open && (
						<SidebarMenuItem className={'pl-2'}>
							<h1 className='text-xl font-medium'>SEP</h1>
						</SidebarMenuItem>
					)}

					<SidebarMenuItem className='pl-0.5 self-end'>
						<SidebarTrigger className='justify-center' />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className='overflow-hidden'>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> Username
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
