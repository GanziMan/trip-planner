import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { authUser } from '@/store/thunkFunctions'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'

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
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector((state) => state.user.user.isAuth)
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser())
    }
  }, [])
  return <div>Hello "/_authenticated"!</div>
}
