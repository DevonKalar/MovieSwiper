// library imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// style imports 
import './styles/variables.css'
import './styles/base.css'
import './styles/layouts.css'
import './styles/utils.css'
import './styles/components.css'

// App import
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
