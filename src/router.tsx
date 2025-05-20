import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { SupabaseProvider } from './contexts/SupabaseContext'

// Wrap routes with the SupabaseProvider
const AppWithProvider = () => (
  <SupabaseProvider>
    <App />
  </SupabaseProvider>
)

// Create a router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWithProvider />,
  },
  // Add more routes as needed
])