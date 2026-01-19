import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find root element')

createRoot(rootElement).render(
    <StrictMode>
        <div>React Component Library Development Environment</div>
    </StrictMode>
)
