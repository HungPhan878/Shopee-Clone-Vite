import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from './Components/GlobalStyles/'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppProvider from './contexts/app.context.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'
import 'src/i18n/i18n'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // để khi accessToken hết hạn không call api quá nhiều lần
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </GlobalStyles>
  </React.StrictMode>
)
