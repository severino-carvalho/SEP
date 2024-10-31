import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layouts/app-layout'
import { About } from './components/pages/about'
import { Home } from './components/pages/home'
import { Contexts } from './contexts'

export function App() {
	return (
		<BrowserRouter>
			<Contexts>
				<AppLayout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</AppLayout>
			</Contexts>
		</BrowserRouter>
	)
}
