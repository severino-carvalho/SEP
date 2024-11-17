import { IChildren } from '@/types/components/IChildren'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './providers/auth-provider'
import { TemaProvider } from './providers/tema-provider'

const queryClient = new QueryClient()

export function Contexts({ children }: Readonly<IChildren>) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<TemaProvider defaultTema='system' storageKey='sep-ui-tema'>
					{children}
				</TemaProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
