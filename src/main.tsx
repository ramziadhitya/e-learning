import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import './style.scss'
import { AuthProvider } from './components/context/AuthContext';




createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
