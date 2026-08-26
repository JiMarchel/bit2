import { About } from '#/features/about-us/screen/about'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <About/>
}
