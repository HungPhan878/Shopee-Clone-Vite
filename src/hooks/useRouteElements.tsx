/* eslint-disable react-refresh/only-export-components */
import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// components
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import { AppContext } from 'src/contexts/app.context'
import CartLayout from 'src/layouts/CartLayout'
import UserLayout from 'src/pages/User/layouts/UserLayout'
import path from 'src/constants/path'

// Dùng lighthouse của google để xem hiệu suất page
// Dùng tải lười qua trang nào thì tải trang đấy
// +Ưu điểm: lúc đầu nhanh hơn và đỡ tôn ram cho client hơn
// +Nhươc điểm: lúc chuyển trang sẽ hơi chậm một chút.
const Login = lazy(() => import('src/pages/Login'))
const ProductList = lazy(() => import('src/pages/ProductList'))
const Profile = lazy(() => import('src/pages/User/pages/Profile'))
const Register = lazy(() => import('src/pages/Register'))
const ProductDetail = lazy(() => import('src/pages/ProductDetail'))
const Cart = lazy(() => import('src/pages/Cart'))
const ChangePassword = lazy(() => import('src/pages/User/pages/ChangePassword'))
const HistoryPurchases = lazy(() => import('src/pages/User/pages/HistoryPurchases'))
const NotFound = lazy(() => import('src/pages/NotFound'))

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
          <Suspense>
            <ProductList />
          </Suspense>
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
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchases,
              element: (
                <Suspense>
                  <HistoryPurchases />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
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
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.product,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      )
    }
  ])

  return routeElements
}
