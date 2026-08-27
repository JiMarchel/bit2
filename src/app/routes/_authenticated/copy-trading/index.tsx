import { createFileRoute } from '@tanstack/react-router'
import { CopyTradingPage } from '@/pages/authenticated/copy-trading'

export const Route = createFileRoute('/_authenticated/copy-trading/')({ component: CopyTradingPage })
