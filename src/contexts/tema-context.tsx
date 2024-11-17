import { Tema } from '@/types/contexts/tema-type'
import { createContext } from 'react'

type TemaProviderState = {
	Tema: Tema
	setTema: (Tema: Tema) => void
}

const initialState: TemaProviderState = {
	Tema: 'system',
	setTema: () => null
}

export const TemaProviderContext = createContext<TemaProviderState>(initialState)

