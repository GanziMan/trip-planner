import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/upload')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/upload"!</div>
}
