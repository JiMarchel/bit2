import { Outlet } from '@tanstack/react-router'
import { AuthenticatedNavbar } from './navbar'

export function AuthenticatedLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AuthenticatedNavbar />
      <Outlet />
    </div>
  )
}
