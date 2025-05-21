import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import App from './App'
import AuthPage from './pages/Auth/AuthPage'
import ForgotPassword from './pages/Auth/ForgotPassword'
import { SupabaseProvider } from './contexts/supabaseContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Placeholder for the actual ResetPasswordPage component
const ResetPasswordPage = () => (
  <div>
    <h2>Reset Password</h2>
    <p>Implement your password reset form here.</p>
    {/* This page would typically include a form to enter a new password and confirm it. */}
    {/* It would use `supabase.auth.updateUser` or a context method to set the new password. */}
  </div>
);

/**
 * RootLayout component that includes the SupabaseProvider.
 * All routes will be children of this component, ensuring a single context instance.
 */
const RootLayout = () => (
  <SupabaseProvider>
    <Outlet /> {/* Child routes will render here */}
  </SupabaseProvider>
);

// --- Router Configuration ---
// Defines the application's routes using createBrowserRouter from react-router-dom.
export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/', // Root path, typically for login/authentication
        element: <AuthPage />
      },
      {
        path: '/forgot-password', // Route for the forgot password page
        element: <ForgotPassword />
      },
      {
        path: '/reset-password', // Route for users to reset their password after email confirmation
        element: <ResetPasswordPage />
      },
      {
        // Protected routes are children of this element
        element: <ProtectedRoute />,
        children: [
          {
            path: 'app', // Main application route for authenticated users
            element: <App /> // App component now has access to the shared Supabase context
          }
          // Add other protected application routes here
          // Example: { path: 'dashboard', element: <DashboardPage /> }
        ]
      }
    ]
  }
])