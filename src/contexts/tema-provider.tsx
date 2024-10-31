import { TemaProviderContext } from '@/hooks/use-tema'
import { useEffect, useState } from 'react'

export type Tema = 'dark' | 'light' | 'system'

type TemaProviderProps = {
	children: React.ReactNode
	defaultTema?: Tema
	storageKey?: string
}

export type TemaProviderState = {
	Tema: Tema
	setTema: (Tema: Tema) => void
}

export function TemaProvider({
	children,
	defaultTema = 'system',
	storageKey = 'sep-ui-tema',
	...props
}: TemaProviderProps) {
	const [Tema, setTema] = useState<Tema>(
		() => (localStorage.getItem(storageKey) as Tema) || defaultTema
	)

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		if (Tema === 'system') {
			const systemTema =
				window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

			root.classList.add(systemTema)
			return
		}

		root.classList.add(Tema)
	}, [Tema])

	const value = {
		Tema,
		setTema: (Tema: Tema) => {
			localStorage.setItem(storageKey, Tema)
			setTema(Tema)
		}
	}

	return (
		<TemaProviderContext.Provider {...props} value={value}>
			{children}
		</TemaProviderContext.Provider>
	)
}
