import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CampeonatoApp } from './CampeonatoApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CampeonatoApp/>
  </StrictMode>,
)
