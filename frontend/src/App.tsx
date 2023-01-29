import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { GlobalStyles } from './global/styles/globalStyles';

import Router from './components/Router';
import AuthProvider from './contexts/AuthContext';

const queryClient = new QueryClient()


function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
