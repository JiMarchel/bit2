import { createFileRoute } from '@tanstack/react-router'
import { FinancialPage } from '@/pages/authenticated/financial'

export const Route = createFileRoute('/_authenticated/financial/')({ component: FinancialPage })
