import { GlobalStyles } from './global/styles/globalStyles';
import Router from './components/Router';
import { AuthProvider } from './contexts/AuthContext';
import GraphQLClientProvider from './contexts/GraphQLContext';

function App() {
  return (
    <>
      <GlobalStyles />
      <GraphQLClientProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </GraphQLClientProvider>
    </>
  )
}

export default App
