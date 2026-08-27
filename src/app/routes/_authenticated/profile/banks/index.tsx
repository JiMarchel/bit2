import { createFileRoute } from '@tanstack/react-router'
import { BanksPage } from '@/pages/authenticated/banks'

export const Route = createFileRoute('/_authenticated/profile/banks/')({ component: BanksPage })
