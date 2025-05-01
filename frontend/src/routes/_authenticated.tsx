import { useAppSelector } from '@/hooks/useAppSelector'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const isAuth = useAppSelector((state) => state.user.user.isAuth)

    if (!isAuth) {
      throw redirect({
        to: '/login',
        search: {
          redirect: '/',
        },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated"!</div>
}
