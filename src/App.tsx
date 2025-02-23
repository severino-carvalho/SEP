import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './components/pages/about'
import { Configuracoes } from './components/pages/configuracoes/configuracoes'
import { Encontro } from './components/pages/configuracoes/encontros/encontros'
import { ManutencaoEncontros } from './components/pages/configuracoes/encontros/manutencao-encontros'
import { Equipe } from './components/pages/configuracoes/equipes/equipe'
import { ManutencaoEquipes } from './components/pages/configuracoes/equipes/manutencao-equipe'
import { ManutencaoUsuarios } from './components/pages/configuracoes/usuarios/manutencao-usuario'
import { Usuario } from './components/pages/configuracoes/usuarios/usuario'
import { Home } from './components/pages/home'
import { Login } from './components/pages/login'
import { ProtectedRoute } from './components/protect-router'
import AppLayout from './components/templates/app-layout'
import { Contexts } from './contexts'
import { RotasAppEnum } from './types/enums/rotas-app-enum'

export function App() {
	return (
		<BrowserRouter>
			<Contexts>
				<Routes>
					<Route path={RotasAppEnum.LOGIN} element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route element={<AppLayout />}>
							<Route path={RotasAppEnum.HOME} element={<Home />} />
							<Route path={RotasAppEnum.SOBRE} element={<About />} />
							<Route path={RotasAppEnum.CONFIGURACOES} element={<Configuracoes />} />
							<Route path={RotasAppEnum.CONFIGURACOES_USUARIO} element={<Usuario />} />
							<Route path={RotasAppEnum.CONFIGURACOES_USUARIO_MANUTENCAO} element={<ManutencaoUsuarios />} />
							<Route path={RotasAppEnum.CONFIGURACOES_ENCONTRO} element={<Encontro />} />
							<Route path={RotasAppEnum.CONFIGURACOES_ENCONTRO_MANUTENCAO} element={<ManutencaoEncontros />} />
							<Route path={RotasAppEnum.CONFIGURACOES_EQUIPE} element={<Equipe />} />
							<Route path={RotasAppEnum.CONFIGURACOES_EQUIPE_MANUTENCAO} element={<ManutencaoEquipes />} />
						</Route>
					</Route>
				</Routes>
			</Contexts>
		</BrowserRouter>
	)
}
