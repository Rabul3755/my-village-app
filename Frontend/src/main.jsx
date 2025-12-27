import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

    <App />
 
)
// Global error handler
window.addEventListener('error', (event) => {
  console.error('🛑 Global error:', event.error);
  console.error('🛑 Error details:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🛑 Unhandled promise rejection:', event.reason);
});