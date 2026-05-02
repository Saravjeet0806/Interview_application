import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react' // ✅ import added
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your environment variables.');
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}> {/* ✅ prop added */}
      <App />
    </ClerkProvider>
    </QueryClientProvider>
    </BrowserRouter>  
  </StrictMode>,
)