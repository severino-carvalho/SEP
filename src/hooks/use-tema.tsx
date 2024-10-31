import { TemaProviderState } from '@/contexts/tema-provider'
import { createContext, useContext } from 'react'

const initialState: TemaProviderState = {
	Tema: 'system',
	setTema: () => null
}

export const TemaProviderContext =
	createContext<TemaProviderState>(initialState)

export const useTema = () => {
	const context = useContext(TemaProviderContext)

	if (context === undefined)
		throw new Error('useTema must be used within a TemaProvider')

	return context
}
