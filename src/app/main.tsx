import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'
import { ThemeProvider } from './providers/theme-provider'
import './styles/global.css'

const router = getRouter()

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <ThemeProvider defaultTheme="system" storageKey="bit2-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>,
  )
}
