import { createFileRoute } from '@tanstack/react-router'
import { PlatformPage } from '@/pages/platform'

export const Route = createFileRoute('/platform/')({ component: PlatformPage })
