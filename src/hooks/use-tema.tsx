import { TemaProviderContext } from '@/contexts/tema-context'
import { useContext } from 'react'

export function useTema() {
	const context = useContext(TemaProviderContext)

	if (!context) throw new Error('useTema must be used within a TemaProvider')

	return context
}
