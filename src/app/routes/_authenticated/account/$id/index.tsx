import { createFileRoute } from '@tanstack/react-router'
import { AccountDetailPage } from '@/pages/authenticated/account'

export const Route = createFileRoute('/_authenticated/account/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <AccountDetailPage id={id} />
}
