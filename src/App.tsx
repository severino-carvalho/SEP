import AppLayout from "./components/layouts/app-layout";
import { Home } from "./components/pages/home";
import { Contexts } from "./contexts";

export function App() {
  return (
    <Contexts>
      <AppLayout>
        <Home />
      </AppLayout>
    </Contexts>
  )
}
