import { createFileRoute } from '@tanstack/react-router'
import { MyWalletPage } from '@/pages/authenticated/financial'

export const Route = createFileRoute('/_authenticated/_financial/my-wallet/')({
  component: MyWalletPage,
})
