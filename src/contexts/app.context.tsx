/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'
import { ExtendedPurchases } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchases[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(
    initialAppContext.extendedPurchases
  )

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        profile,
        setProfile,
        extendedPurchases,
        setExtendedPurchases
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
