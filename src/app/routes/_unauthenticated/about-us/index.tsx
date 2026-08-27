import { createFileRoute } from '@tanstack/react-router'
import { AboutUsPage } from '@/pages/unathenticated/about-us'

export const Route = createFileRoute('/_unauthenticated/about-us/')({ component: AboutUsPage })
