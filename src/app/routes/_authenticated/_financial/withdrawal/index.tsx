import { createFileRoute } from '@tanstack/react-router'
import { WithdrawalPage } from '@/pages/authenticated/financial'

export const Route = createFileRoute('/_authenticated/_financial/withdrawal/')({
  component: WithdrawalPage,
})
