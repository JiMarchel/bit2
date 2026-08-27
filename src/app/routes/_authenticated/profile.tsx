import { createFileRoute } from '@tanstack/react-router'
import { ProfileLayout } from '../../layout/authenticated/profile-layout'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfileLayout,
})
