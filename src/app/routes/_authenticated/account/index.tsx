import { createFileRoute } from '@tanstack/react-router'
import { AccountPage } from '@/pages/authenticated/account'

export const Route = createFileRoute('/_authenticated/account/')({ component: AccountPage })
