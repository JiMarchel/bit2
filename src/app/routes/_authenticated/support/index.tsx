import { createFileRoute } from '@tanstack/react-router'
import { SupportEmpty } from '@/pages/authenticated/support'

export const Route = createFileRoute('/_authenticated/support/')({
  component: SupportEmpty,
})
