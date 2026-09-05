import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SupportShell } from '@/pages/authenticated/support'

export const Route = createFileRoute('/_authenticated/support')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SupportShell>
      <Outlet />
    </SupportShell>
  )
}
