import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layouts/app-layout'
import { About } from './components/pages/about'
import { Configuracoes } from './components/pages/configuracoes/configuracoes'
import { Home } from './components/pages/home'
import { Login } from './components/pages/login'
import { ProtectedRoute } from './components/protect-router'
import { Contexts } from './contexts'
import { AuthProvider } from './contexts/auth-context'
import { RotasEnum } from './types/enums/RotasEnum'

export function App() {
	return (
		<BrowserRouter>
			<Contexts>
				<AuthProvider>
					<Routes>
						<Route path={RotasEnum.LOGIN} element={<Login />} />
						<Route element={<ProtectedRoute />}>
							<Route element={<AppLayout />}>
								<Route path={RotasEnum.HOME} element={<Home />} />
								<Route path={RotasEnum.SOBRE} element={<About />} />
								<Route path={RotasEnum.CONFIGURACOES} element={<Configuracoes />} />
							</Route>
						</Route>
					</Routes>
				</AuthProvider>
			</Contexts>
		</BrowserRouter>
	)
}
