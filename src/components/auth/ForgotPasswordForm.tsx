import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../lib/supabaseClient'; // No longer needed
import { useSupabase } from '../../contexts/supabaseContext'; // Import useSupabase
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * ForgotPasswordForm component.
 * Handles the process of requesting a password reset email.
 * Uses the `resetPasswordForEmail` method from the `SupabaseContext`.
 * Displays success or error messages to the user.
 */
const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    // const [loading, setLoading] = useState(false); // Handled by context
    const [message, setMessage] = useState<string | null>(null);
    // const [error, setError] = useState<string | null>(null); // Handled by context
    const navigate = useNavigate();
    const { resetPasswordForEmail, loading, error: contextError, setError: setContextError } = useSupabase(); // Use from context

    /**
     * Handles the form submission for password reset.
     * Prevents default form action and calls `resetPasswordForEmail` from context.
     * Sets a message on success or relies on context for error display.
     * The `redirectTo` URL specifies where the user will be sent after clicking the link in the email.
     */
    const handleResetPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        // setLoading(true); // Handled by context
        setMessage(null);
        if (setContextError) setContextError(null); // Clear previous context errors

        try {
            await resetPasswordForEmail(email, `${window.location.origin}/reset-password`);
            setMessage('Password reset instructions have been sent to your email. If you don\'t see it, please check your spam folder.');
        } catch (err: any) {
            // Error is already set in context by resetPasswordForEmail method
            // If specific component-level error handling is needed, it can be done here
            // For now, relying on the context error to be displayed.
        } finally {
            // setLoading(false); // Handled by context
        }
    };

    return (
        <form onSubmit={handleResetPassword} className="auth-form" aria-labelledby="reset-password-heading">
            <h1 id="reset-password-heading" className="auth-title">Reset Your Password</h1>
            <p className="text-center text-slate-300 mb-6">
                Enter your email address and we'll send you instructions on how to reset your password.
            </p>
            <div>
                <label htmlFor="emailForgotPassword" className="auth-label">Email address</label>
                <input
                    id="emailForgotPassword"
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
            <button type="submit" className="auth-submit-button" disabled={loading}>
                {loading ? (
                    <>
                        <LoadingSpinner size="small" className="button-spinner" />
                        <span>Sending...</span>
                    </>
                ) : 'Send Reset Instructions'}
            </button>
            {contextError && <p className="auth-error-message" role="alert">{contextError.message}</p>}
            {message && <p className="auth-info-message" role="status">{message}</p>}

            <button
                type="button"
                className="forgot-password-back-button"
                onClick={() => navigate('/')}
            >
                Back to Sign In
            </button>
        </form>
    );
};

export default ForgotPasswordForm; 