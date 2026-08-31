import { createFileRoute } from '@tanstack/react-router'
import { DepositPage } from '@/pages/authenticated/financial'

export const Route = createFileRoute('/_authenticated/_financial/deposit/')({
  component: DepositPage,
})
