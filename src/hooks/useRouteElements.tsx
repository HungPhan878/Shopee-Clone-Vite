/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// components
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import { AppContext } from 'src/contexts/app.context'
import Login from 'src/pages/Login'
import ProductList from 'src/pages/ProductList'
import Profile from 'src/pages/User/pages/Profile'
import Register from 'src/pages/Register'
import path from 'src/constants/path'
import ProductDetail from 'src/pages/ProductDetail'
import Cart from 'src/pages/Cart'
import CartLayout from 'src/layouts/CartLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import ChangePassword from 'src/pages/User/pages/ChangePassword'
import HistoryPurchases from 'src/pages/User/pages/HistoryPurchases'
import NotFound from 'src/pages/User/pages/NotFound'

// const isAuthenticated = false
// plugin routes when authenticated
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchases,
              element: <HistoryPurchases />
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.product,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
