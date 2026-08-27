import { Outlet } from '@tanstack/react-router'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function UnauthenticatedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
