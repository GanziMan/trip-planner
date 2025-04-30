import { persistor, store } from '@/store'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export const Route = createRootRoute({
  component: () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="top-center" reverseOrder={false} />
        {/* Outlet은 이자리에서 자식 라우트 컴포넌트들을 렌더링 해주세요 와 같은 표시 */}
        <Outlet />
        <TanStackRouterDevtools />
      </PersistGate>
    </Provider>
  ),
})
