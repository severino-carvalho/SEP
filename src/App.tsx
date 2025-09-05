import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/protect-router'
import AppLayout from './components/templates/app-layout'
import { Contexts } from './contexts'
import { About } from './pages/about'
import { Configuracoes } from './pages/configuracoes/configuracoes'
import { ManutencaoEncontros } from './pages/configuracoes/encontros/manutencao-encontros'
import { Equipe } from './pages/configuracoes/equipes/equipe'
import { ManutencaoEquipes } from './pages/configuracoes/equipes/manutencao-equipe'
import { Equipista } from './pages/configuracoes/equipistas/equipista'
import { ManutencaoEquipista } from './pages/configuracoes/equipistas/manutencao-equipista'
import { ManutencaoUsuarios } from './pages/configuracoes/usuarios/manutencao-usuario'
import { Usuario } from './pages/configuracoes/usuarios/usuario'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { RotasAppEnum } from './types/enums/rotas-app-enum'
import { Encontro } from './pages/configuracoes/encontros/encontros'

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
							<Route path={RotasAppEnum.CONFIGURACOES_EQUIPISTA} element={<Equipista />} />
							<Route path={RotasAppEnum.CONFIGURACOES_EQUIPISTA_MANUTENCAO} element={<ManutencaoEquipista />} />
						</Route>
					</Route>
				</Routes>
			</Contexts>
		</BrowserRouter>
	)
}
