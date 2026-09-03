import { createFileRoute } from '@tanstack/react-router'
import { SupportListPage } from '@/pages/authenticated/support'

export const Route = createFileRoute('/_authenticated/support/')({
  component: SupportListPage,
})
