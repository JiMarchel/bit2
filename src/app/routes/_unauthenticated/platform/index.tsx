import { createFileRoute } from '@tanstack/react-router'
import { PlatformPage } from '@/pages/platform'

export const Route = createFileRoute('/_unauthenticated/platform/')({ component: PlatformPage })
