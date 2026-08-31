import { createFileRoute } from '@tanstack/react-router'
import { InternalTransferPage } from '@/pages/authenticated/financial'

export const Route = createFileRoute('/_authenticated/_financial/internal-transfer/')({
  component: InternalTransferPage,
})
