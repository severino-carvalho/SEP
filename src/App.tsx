import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './components/pages/about'
import { Configuracoes } from './components/pages/configuracoes/configuracoes'
import { Encontro } from './components/pages/configuracoes/encontros/encontros'
import { ManutencaoEncontros } from './components/pages/configuracoes/encontros/manutencao-encontros'
import { ManutencaoPastas } from './components/pages/configuracoes/pastas/manutencao-pastas'
import { Pasta } from './components/pages/configuracoes/pastas/pastas'
import { ManutencaoUsuarios } from './components/pages/configuracoes/usuarios/manutencao-usuario'
import { Usuario } from './components/pages/configuracoes/usuarios/usuario'
import { Home } from './components/pages/home'
import { Login } from './components/pages/login'
import { ProtectedRoute } from './components/protect-router'
import AppLayout from './components/templates/app-layout'
import { Contexts } from './contexts'
import { RotasEnum } from './types/enums/rotas-app-enum'

export function App() {
	return (
		<BrowserRouter>
			<Contexts>
				<Routes>
					<Route path={RotasEnum.LOGIN} element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route element={<AppLayout />}>
							<Route path={RotasEnum.HOME} element={<Home />} />
							<Route path={RotasEnum.SOBRE} element={<About />} />
							<Route path={RotasEnum.CONFIGURACOES} element={<Configuracoes />} />
							<Route path={RotasEnum.CONFIGURACOES_USUARIO} element={<Usuario />} />
							<Route path={RotasEnum.CONFIGURACOES_USUARIO_MANUTENCAO} element={<ManutencaoUsuarios />} />
							<Route path={RotasEnum.CONFIGURACOES_ENCONTRO} element={<Encontro />} />
							<Route path={RotasEnum.CONFIGURACOES_ENCONTRO_MANUTENCAO} element={<ManutencaoEncontros />} />
							<Route path={RotasEnum.CONFIGURACOES_PASTA} element={<Pasta />} />
							<Route path={RotasEnum.CONFIGURACOES_PASTA_MANUTENCAO} element={<ManutencaoPastas />} />
						</Route>
					</Route>
				</Routes>
			</Contexts>
		</BrowserRouter>
	)
}
