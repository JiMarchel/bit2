import { createFileRoute } from '@tanstack/react-router'
import { IbPage } from '@/pages/authenticated/ib'

export const Route = createFileRoute('/_authenticated/ib/')({ component: IbPage })
