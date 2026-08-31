import { createFileRoute } from '@tanstack/react-router'
import { MarketAnalysisPage } from '@/pages/authenticated/market-analysis'

export const Route = createFileRoute('/_authenticated/market-analysis/')({
  component: MarketAnalysisPage,
})
