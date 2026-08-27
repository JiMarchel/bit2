import { createFileRoute } from '@tanstack/react-router'
import { ReferralPage } from '@/pages/authenticated/referral'

export const Route = createFileRoute('/_authenticated/profile/referral/')({ component: ReferralPage })
