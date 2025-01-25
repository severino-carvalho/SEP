import { queryClient } from '@/lib/useQuery/query-client'
import { IChildren } from '@/types/components/IChildren'
import { LOCAL_STORAGE_ENUM } from '@/types/enums/local-storage-key-enum'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './providers/auth-provider'
import { TemaProvider } from './providers/tema-provider'

export function Contexts({ children }: Readonly<IChildren>) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<TemaProvider
					defaultTema='system'
					storageKey={LOCAL_STORAGE_ENUM.SEP_UI_TEMA}
				>
					{children}
				</TemaProvider>
			</AuthProvider>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
