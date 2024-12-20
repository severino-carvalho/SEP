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
import { useAuth } from '@/hooks/use-auth'
import { useTema } from '@/hooks/use-tema'
import { RotasAppEnum } from '@/types/enums/rotas-app-enum'
import { TooltipContent } from '@radix-ui/react-tooltip'
import {
	ChevronUp,
	Home,
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
import { Tooltip } from './ui/tooltip'

const items = [
	{ title: 'Home', url: RotasAppEnum.HOME, icon: Home },
	{ title: 'Configurações', url: RotasAppEnum.CONFIGURACOES, icon: Settings }
]

type AppSidebarProps = { open?: boolean }

export function AppSidebar({ open }: Readonly<AppSidebarProps>) {
	const { logout } = useAuth()
	const { Tema, setTema } = useTema()

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className='pt-5'>
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
											<Tooltip>
												<item.icon />
												<span>{item.title}</span>
												<TooltipContent>
													<p>Add to library</p>
												</TooltipContent>
											</Tooltip>
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
									<User2 /> Usuario
									<ChevronUp className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side='top' className='w-[--radix-popper-anchor-width]'>
								<DropdownMenuItem disabled={true}>
									<span>Conta</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='hover:cursor-pointer' onClick={() => {
									if (Tema === "dark" || Tema === "system") setTema("light")
									else setTema("dark")
								}}>
									<span>Mudar tema</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='hover:cursor-pointer' onClick={logout}>
									<span>Sair</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
