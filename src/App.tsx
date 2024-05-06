import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// components
import useRouteElements from './hooks/useRouteElements'

function App() {
  const routeElements = useRouteElements()

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
