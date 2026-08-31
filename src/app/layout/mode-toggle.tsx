import { Moon, Sun } from 'lucide-react'
import { Button } from '@/shared/ui'
import { useTheme } from '../theme/theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  function handleToggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white/70 hover:bg-white/10 hover:text-white"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
