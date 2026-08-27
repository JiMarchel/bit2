import { createFileRoute } from '@tanstack/react-router'
import { ForgetPasswordPage } from '@/pages/unathenticated/auth/forget-password'

export const Route = createFileRoute('/_unauthenticated/(auth)/forget-password/')({
  component: ForgetPasswordPage,
})
