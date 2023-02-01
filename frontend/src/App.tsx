import { GlobalStyles } from './global/styles/globalStyles';
import Router from './components/Router';
import Providers from './components/Providers';

function App() {
  return (
    <>
      <GlobalStyles />
      <Providers>
        <Router />
      </Providers>
    </>
  )
}

export default App
