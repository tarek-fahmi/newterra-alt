import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { useSupabase } from './contexts/supabaseContext'
import LoadingSpinner from './components/ui/LoadingSpinner'

function App() {
  const { user, signOut, error } = useSupabase()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
      // Navigate is handled by the useEffect
    } catch (err) {
      console.error('Error signing out:', err)
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="app">
      <h1>Welcome to the App!</h1>
      <p>This is the main application content, accessible after successful authentication.</p>
      <div className="user-info">
        <p>You are logged in as: <strong>{user?.email}</strong></p>
        {error && <p className="error-message" role="alert">{error.message}</p>}
      </div>
      <button
        onClick={handleSignOut}
        className="submit-button sign-out-button"
        disabled={isSigningOut}
      >
        {isSigningOut ? (
          <>
            <LoadingSpinner size="small" className="button-spinner" />
            <span>Signing Out...</span>
          </>
        ) : 'Sign Out'}
      </button>
    </div>
  )
}

export default App