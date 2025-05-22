import { Tema } from "@/types/contexts/tema-type"
import { LOCAL_STORAGE_ENUM } from "@/types/enums/local-storage-key-enum"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { TemaProviderContext } from "../tema-context"

type TemaProviderProps = {
	children: ReactNode
	defaultTema?: Tema
	storageKey?: string
}

export function TemaProvider({
	children,
	defaultTema = 'system',
	storageKey = LOCAL_STORAGE_ENUM.SEP_UI_TEMA,
	...props
}: Readonly<TemaProviderProps>) {
	const [Tema, setTema] = useState<Tema>(
		() => (localStorage.getItem(storageKey) as Tema) || defaultTema
	)

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		if (Tema === 'system') {
			const systemTema = window
				.matchMedia('(prefers-color-scheme: dark)')
				.matches ? 'dark' : 'light'

			root.classList.add(systemTema)
			return
		}

		root.classList.add(Tema)
	}, [Tema])

	const temaContextValue = useMemo(() => {
		return {
			Tema,
			setTema: (tema: Tema) => {
				localStorage.setItem(storageKey, tema)
				setTema(tema)
			}
		}
	}, [Tema, storageKey])

	return (
		<TemaProviderContext.Provider {...props} value={temaContextValue}>
			{children}
		</TemaProviderContext.Provider>
	)
}