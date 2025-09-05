// library imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// style imports 
import './styles/base.css'

// App import
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
