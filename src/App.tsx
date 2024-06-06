import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'

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
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
