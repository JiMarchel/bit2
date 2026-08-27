import { createFileRoute } from '@tanstack/react-router'
import { KycPage } from '@/pages/authenticated/kyc'

export const Route = createFileRoute('/_authenticated/profile/kyc/')({ component: KycPage })
