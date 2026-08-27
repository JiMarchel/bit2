import { createFileRoute } from '@tanstack/react-router'
import { SecurityPage } from '@/pages/authenticated/security'

export const Route = createFileRoute('/_authenticated/profile/security/')({ component: SecurityPage })
