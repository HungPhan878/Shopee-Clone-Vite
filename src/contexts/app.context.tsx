/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
