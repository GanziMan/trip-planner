import { Footer } from '@/compoennts/Footer'
import { Navbar } from '@/compoennts/Navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      {/* Header */}
      <Navbar />
      <main className="mb-auto">
        <Outlet />
      </main>
      <Footer />
      {/* Footer */}
    </div>
  )
}
