import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/cart"!</div>
}
