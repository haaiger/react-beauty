import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/css/reset.css'
import '@shared/css/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)