import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/supabaseContext';
import GoogleIcon from '../../assets/google-icon.svg';
import FacebookIcon from '../../assets/facebook-icon.svg';
import AppleIcon from '../../assets/apple-icon.svg';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';

/**
 * LoginForm component.
 * Handles user login via email/password and OAuth providers (Google, Facebook, Apple).
 * Uses the `useSupabase` hook to interact with authentication methods from `SupabaseContext`.
 * Navigates to the '/app' route upon successful login.
 */
const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const { signIn, loading, error, user, signInWithOAuth } = useSupabase();
    const navigate = useNavigate();

    // Effect to navigate to the main application page ('/app') if the user is already logged in
    // or after a successful login.
    useEffect(() => {
        // Navigate after successful login
        if (user) {
            navigate('/app');
        }
    }, [user, navigate]);

    /**
     * Handles the email/password login form submission.
     * Prevents default form submission and calls the `signIn` method from context.
     */
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        await signIn(email, password);
        // Navigation is now handled by the useEffect
    };

    /**
     * Handles OAuth login with the specified provider.
     * Calls the `signInWithOAuth` method from the Supabase context.
     * @param provider The OAuth provider (e.g., 'google', 'facebook', 'apple').
     */
    const handleOAuthLogin = async (provider: 'google' | 'facebook' | 'apple') => {
        await signInWithOAuth(provider);
    };

    return (
        <form onSubmit={handleLogin} className="auth-form login-form" aria-labelledby="login-heading">
            <h2 id="login-heading" className="visually-hidden">Login Form</h2>

            {/* OAuth Buttons */}
            <button
                type="button"
                className="auth-oauth-button"
                onClick={() => handleOAuthLogin('google')}
                aria-label="Continue with Google"
            >
                <img src={GoogleIcon} alt="" aria-hidden="true" /> Continue with Google
            </button>
            <button
                type="button"
                className="auth-oauth-button"
                onClick={() => handleOAuthLogin('facebook')}
                aria-label="Continue with Facebook"
            >
                <img src={FacebookIcon} alt="" aria-hidden="true" /> Continue with Facebook
            </button>
            <button
                type="button"
                className="auth-oauth-button"
                onClick={() => handleOAuthLogin('apple')}
                aria-label="Continue with Apple"
            >
                <img src={AppleIcon} alt="" aria-hidden="true" /> Continue with Apple
            </button>

            <div className="auth-divider-container">
                <div className="auth-divider-line" aria-hidden="true">
                    <span></span>
                </div>
                <div className="auth-divider-text-wrapper">
                    <span className="auth-divider-text">Or continue with</span>
                </div>
            </div>

            <div>
                <label htmlFor="emailLogin" className="auth-label">Email Address</label>
                <input
                    id="emailLogin"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-required="true"
                    autoComplete="email"
                    className="auth-input"
                    placeholder="your@email.com"
                />
            </div>

            <div>
                <label htmlFor="passwordLogin" className="auth-label">Password</label>
                <div className="password-input-container">
                    <input
                        id="passwordLogin"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-required="true"
                        autoComplete="current-password"
                        className="auth-input"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        className="password-toggle-button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="auth-checkbox-container">
                <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="auth-checkbox"
                />
                <label htmlFor="rememberMe" className="auth-checkbox-label">Remember me</label>
            </div>

            <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <LoadingSpinner size="small" className="button-spinner" />
                        <span>Signing In...</span>
                    </>
                ) : 'Sign In'}
            </button>
            {error && <p className="auth-error-message" role="alert">{error.message}</p>}
        </form>
    );
};

export default LoginForm; 