import { createBrowserRouter } from 'react-router-dom'
import App from './App'

// Create a router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // Add more routes as needed
])