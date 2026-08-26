import { Transaction } from '#/features/trading/screen/transaction'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trading/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <Transaction />
  </>
}
