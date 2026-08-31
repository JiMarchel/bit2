import { useQuery } from '@tanstack/react-query'

export type Recommendation = 'buy' | 'sell' | 'neutral' | 'strong buy' | 'strong sell'

export type Analysis = {
  symbol: string
  timeframe: string
  analysis: {
    indicators: {
      moving_averages: {
        sma_10: number
        sma_20: number
        sma_50: number
        price_vs_sma50: number
      }
      rsi: number
      macd: {
        macd_line: number
        signal_line: number
        histogram: number
      }
      bollinger_bands: {
        upper: number
        middle: number
        lower: number
        price_position: number
      }
    }
    signals: {
      ma_cross: string
      ma_trend: string
      rsi: string
      macd: string
      bollinger: string
    }
    recommendation: Recommendation
    last_update: string
    current_price: {
      bid: number
      ask: number
      spread: number
    }
    trading_suggestions?: {
      stop_loss: number
      take_profit: {
        atr_based: number
        key_level: number
        fibonacci: number
      }
      volatility: {
        atr: number
        daily_range: number
      }
      key_levels: {
        recent_high: number
        recent_low: number
        swing_high: number
        swing_low: number
      }
      risk_reward: {
        atr_based: number
        key_level: number
        fibonacci: number
      }
    }
  }
}

const API_URL = 'https://api-mt5.techcrm.net/v5-terminal-analis/analysis_main'

export async function fetchAnalyses(timeframe = 'H1'): Promise<Analysis[]> {
  const res = await fetch(`${API_URL}?timeframe=${timeframe}`)
  if (!res.ok) throw new Error(`Failed to load analyses (${res.status})`)
  const json = (await res.json()) as { result: string; message: Analysis[] }
  return json.message
}

export function useAnalyses() {
  return useQuery({
    queryKey: ['analyses', 'H1'],
    queryFn: () => fetchAnalyses('H1'),
    refetchInterval: 60_000,
  })
}

const FLAG_CODE_MAP: Record<string, string> = {
  US: 'us',
  EU: 'eu',
  GB: 'gb',
  JP: 'jp',
  CH: 'ch',
  CA: 'ca',
  AU: 'au',
  NZ: 'nz',
}

export function getSymbolFlags(symbol: string): string[] {
  const codes: string[] = []
  // Forex pairs are two 3-letter currencies (EURUSD -> EUR, USD).
  // Flag files are 2-letter country codes taken from each currency's first two letters.
  for (let i = 0; i + 3 <= symbol.length; i += 3) {
    const currency = symbol.slice(i, i + 2)
    const lower = FLAG_CODE_MAP[currency]
    if (lower) codes.push(`/flags/${lower}.svg`)
  }
  return codes
}
