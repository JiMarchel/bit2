import { createFileRoute } from '@tanstack/react-router'
import { CryptoPage } from '@/pages/authenticated/crypto'

export const Route = createFileRoute('/_authenticated/profile/crypto/')({ component: CryptoPage })
