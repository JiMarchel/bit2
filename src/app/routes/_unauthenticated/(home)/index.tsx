import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/pages/unathenticated/home'

export const Route = createFileRoute('/_unauthenticated/(home)/')({ component: HomePage })
