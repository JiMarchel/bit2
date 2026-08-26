import { Body } from '#/features/platform/screen/body'
import { Header } from '#/features/platform/screen/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/platform/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <Header />
    <Body />
  </>
}
