import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppProvider from './contexts/app.context.tsx'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary.tsx'

// components
import useRouteElements from './hooks/useRouteElements'
import { localStorageEvenTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEvenTarget.addEventListener('clearLS', reset)

    // Nhớ rằng khi listener event thì nhớ remove khi unmount để khỏi bị memory leak bộ nhớ
    return () => {
      localStorageEvenTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      <AppProvider>
        <ErrorBoundary>
          {routeElements}
          <ToastContainer />
        </ErrorBoundary>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
