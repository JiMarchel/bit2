import { createFileRoute } from '@tanstack/react-router'
import { SignUpPage } from '@/pages/unathenticated/auth/sign-up'

export const Route = createFileRoute('/_unauthenticated/(auth)/sign-up/')({
  component: SignUpPage,
})
