import { User } from './user.type.ts'
import { ResponsiveApi } from './util.type.ts'

export type AuthResponsive = ResponsiveApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_tokenL: number
  user: User
}>
