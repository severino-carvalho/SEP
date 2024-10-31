import { IChildren } from '@/types/components/IChildren'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TemaProvider } from './tema-provider'

const queryClient = new QueryClient()

export function Contexts({ children }: Readonly<IChildren>) {
	return (
		<QueryClientProvider client={queryClient}>
			<TemaProvider defaultTema='system' storageKey='sep-ui-tema'>
				{children}
			</TemaProvider>
		</QueryClientProvider>
	)
}