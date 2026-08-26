import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '#/features/home/screen/hero'
import { MarketsToday } from '#/features/home/screen/markets-today'
import { Services } from '#/features/home/screen/services'
import { AccountTypes } from '#/features/home/screen/account-types'
import { WhyUs } from '#/features/home/screen/why-us'
import { RegisterNow } from '#/features/home/screen/register-now'

export const Route = createFileRoute('/(home)/')({ component: Home })

function Home() {
  return (
    <>
      <Hero />
      <MarketsToday />
      <Services />
      <AccountTypes />
      <WhyUs />
      <RegisterNow />
    </>
  )
}
