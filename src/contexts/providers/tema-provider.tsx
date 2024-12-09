import { Tema } from "@/types/contexts/tema-type"
import { LOCAL_STORAGE_ENUM } from "@/types/enums/local-storage-key-enum"
import { useEffect, useState } from "react"
import { TemaProviderContext } from "../tema-context"

type TemaProviderProps = {
	children: React.ReactNode
	defaultTema?: Tema
	storageKey?: string
}

export function TemaProvider({
	children,
	defaultTema = 'system',
	storageKey = LOCAL_STORAGE_ENUM.SEP_UI_TEMA,
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