import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Session, User, Provider } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { SupabaseError } from '../types'

/**
 * Defines the shape of the Supabase context, including session, user, auth methods,
 * loading states, and error handling.
 */
type SupabaseContextType = {
  session: Session | null
  user: User | null
  loading: boolean // True when an auth operation is in progress
  error: SupabaseError | null // Stores any error from auth operations
  setError: (error: SupabaseError | null) => void // Function to manually set or clear errors
  signIn: (email: string, password: string) => Promise<void> // Signs in a user with email and password
  signUp: (email: string, password: string, options?: { data: Record<string, any> }) => Promise<void> // Signs up a new user with email and password
  signOut: () => Promise<void> // Signs out the current user
  signInWithOAuth: (provider: Provider) => Promise<void> // Initiates OAuth sign-in with a specified provider
  resetPasswordForEmail: (email: string, redirectTo: string) => Promise<void> // Sends a password reset email
}

// Create the context with an undefined initial value.
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

/**
 * SupabaseProvider component that wraps parts of the application needing access to Supabase authentication.
 * It manages session state, user data, loading indicators, and error messages related to authentication.
 * It also provides functions to interact with Supabase auth (signIn, signUp, signOut, OAuth, password reset).
 */
export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // Start with loading true until initial session is fetched
  const [error, setError] = useState<SupabaseError | null>(null)

  useEffect(() => {
    setLoading(true); // Set loading true when starting to fetch session or listening to auth changes
    // Attempt to get the current session from Supabase on initial load.
    supabase.auth.getSession().then(({ data: { session: currentSession }, error: sessionError }) => { // Renamed session to currentSession
      if (sessionError) {
        setError({ message: sessionError.message })
      } else {
        setError(null); // Clear any previous error on successful session fetch
        setSession(currentSession); 
        setUser(currentSession?.user ?? null); 
      }
      setLoading(false);
    }).catch(err => {
      setError({ message: err.message }); // Catch any potential errors during getSession()
      setLoading(false);
    });

    // Subscribe to Supabase auth state changes (e.g., user logs in or out).
    // This ensures the session and user state are updated in real-time.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => { // Renamed session to newSession
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false) // Finished processing auth state change
      setError(null) // Clear any previous errors on auth state change
    })

    // Cleanup function to unsubscribe from auth state changes when the component unmounts.
    return () => {
      subscription?.unsubscribe() // Check if subscription exists before unsubscribing
    }
  }, [])

  // Wraps the Supabase signInWithPassword call, handling loading and error states.
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setLoading(false)
    }
  }

  // Wraps the Supabase signUp call, handling loading and error states.
  const signUp = async (email: string, password: string, options?: { data: Record<string, any> }) => {
    try {
      setLoading(true)
      setError(null)
      const { error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password, 
        options: options // This will include { data: { full_name: ... } }
      });
      if (signUpError) throw signUpError;
      // On successful sign-up, Supabase client handles email confirmation flows.
      // User state will be updated via onAuthStateChange listener.
    } catch (err: any) {
      setError({ message: err.message, ...err }); // Include other error properties if available
    } finally {
      setLoading(false)
    }
  }

  // Wraps the Supabase signOut call, handling loading and error states.
  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setLoading(false)
    }
  }

  // Wraps the Supabase signInWithOAuth call, handling loading and error states.
  const signInWithOAuth = async (provider: Provider) => {
    try {
      setLoading(true)
      setError(null)
      const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider })
      if (oauthError) throw oauthError
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setLoading(false)
    }
  }

  // Wraps the Supabase resetPasswordForEmail call, handling loading and error states.
  // It re-throws the error to allow components to handle post-submission logic if needed.
  const resetPasswordForEmail = async (email: string, redirectTo: string) => {
    try {
      setLoading(true)
      setError(null)
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })
      if (resetError) throw resetError
    } catch (err: any) {
      setError({ message: err.message })
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = {
    session,
    user,
    loading,
    error,
    setError,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
    resetPasswordForEmail
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

/**
 * Custom hook to easily access the SupabaseContext.
 * Throws an error if used outside of a SupabaseProvider, ensuring context is available.
 */
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}