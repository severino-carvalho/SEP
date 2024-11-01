import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layouts/app-layout'
import { About } from './components/pages/about'
import { Configuracoes } from './components/pages/configuracoes'
import { Home } from './components/pages/home'
import { Login } from './components/pages/login'
import { RotasEnum } from './types/enums/RotasEnum'

export function App() {
	const [isLogado, setIsLogado] = useState<boolean>(false)

	if (!isLogado) {
		return <Login />
	}

	return (
		<BrowserRouter>
			<AppLayout>
				<Routes>
					<Route path={RotasEnum.HOME} element={<Home />} />
					<Route path={RotasEnum.SOBRE} element={<About />} />
					<Route path={RotasEnum.CONFIGURACOES} element={<Configuracoes />} />
				</Routes>
			</AppLayout>
		</BrowserRouter>
	)
}
