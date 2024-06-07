const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  profile: '/user/profile',
  product: ':nameId',
  cart: '/cart',
  user: '/user',
  changePassword: '/user/password',
  historyPurchases: '/user/purchases '
} as const

export default path
