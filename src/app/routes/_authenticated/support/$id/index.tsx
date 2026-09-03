import { createFileRoute } from '@tanstack/react-router'
import { SupportChatPage } from '@/pages/authenticated/support'

export const Route = createFileRoute('/_authenticated/support/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <SupportChatPage id={id} />
}
