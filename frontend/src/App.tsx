import { GlobalStyles } from './global/styles/globalStyles';
import Router from './components/Router';
import { AuthProvider } from './contexts/AuthContext';
import GraphQLClientProvider from './contexts/GraphQLContext';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <>
      <GlobalStyles />
      <GraphQLClientProvider>
        <AuthProvider>
          <LanguageProvider >
            <Router />
          </LanguageProvider>
        </AuthProvider>
      </GraphQLClientProvider>
    </>
  )
}

export default App
