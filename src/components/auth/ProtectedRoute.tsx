import { Navigate, Outlet } from 'react-router-dom'
import { useSupabase } from '../../contexts/supabaseContext'
import LoadingSpinner from '../ui/LoadingSpinner'

type ProtectedRouteProps = {
    redirectTo?: string
}

export const ProtectedRoute = ({
    redirectTo = '/'
}: ProtectedRouteProps) => {
    const { user, loading } = useSupabase()

    if (loading) {
        return (
            <div className="loading-container">
                <LoadingSpinner size="large" />
                <p>Verifying your authentication...</p>
                <p className="loading-subtitle">You'll be redirected automatically once verified.</p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={redirectTo} replace />
    }

    return <Outlet />
} 