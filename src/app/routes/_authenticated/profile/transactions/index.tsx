import { createFileRoute } from '@tanstack/react-router'
import { TransactionsPage } from '@/pages/authenticated/transactions'

export const Route = createFileRoute('/_authenticated/profile/transactions/')({ component: TransactionsPage })
