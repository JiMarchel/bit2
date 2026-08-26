import { SignUpScreen } from '#/features/auth/sign-up/screen/sign-up-screen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignUpScreen/>
}
