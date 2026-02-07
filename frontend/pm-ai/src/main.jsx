import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { TamboProvider } from "@tambo-ai/react"

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TamboProvider 
    apiKey={import.meta.env.VITE_TAMBO_API_KEY}
    projectId={import.meta.env.VITE_TAMBO_PROJECT_ID}
    autoGenerateThreadName={false}
    >
      <App />
    </TamboProvider>
  </React.StrictMode>

)



