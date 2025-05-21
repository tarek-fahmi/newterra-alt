import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/supabaseContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';
import { PasswordStrengthIndicator } from '../ui/PasswordStrengthIndicator';

/**
 * SignUpForm component.
 * Handles new user registration via email/password and OAuth providers.
 * Features password strength validation and visual feedback.
 * Uses the `useSupabase` hook for `signUp` and `signInWithOAuth` methods from `SupabaseContext`.
 * Displays confirmation messages or errors to the user.
 */
const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signUp, loading, error, setError, user } = useSupabase();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !error && !message) {
            navigate('/app');
        }
    }, [user, navigate, error, message]);

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage(null);
        if (setError) setError(null);

        if (!fullName.trim()) {
            if (setError) setError({ message: 'Full name is required.' });
            return;
        }
        if (password !== confirmPassword) {
            if (setError) setError({ message: 'Passwords do not match.' });
            return;
        }
        if (password.length < 6) {
            if (setError) setError({ message: 'Password must be at least 6 characters.' });
            return;
        }
        if (!agreeToTerms) {
            if (setError) setError({ message: 'You must agree to the Terms & Conditions and Privacy Policy.' });
            return;
        }

        try {
            await signUp(email, password, { data: { full_name: fullName.trim() } });
            setMessage('Please check your email to confirm your account. If you don\'t see it, check your spam folder.');
        } catch (e: any) {
            // Error is handled by the context
        }
    };

    return (
        <form onSubmit={handleSignUp} className="auth-form signup-form" aria-labelledby="signup-heading">
            <h2 id="signup-heading" className="visually-hidden">Sign Up Form</h2>

            <div>
                <label htmlFor="fullName" className="auth-label">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="auth-input"
                    placeholder="John Smith"
                    required
                    aria-required="true"
                />
            </div>

            <div>
                <label htmlFor="emailSignUp" className="auth-label">Email Address</label>
                <input
                    id="emailSignUp"
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
                <label htmlFor="passwordSignUp" className="auth-label">Password</label>
                <div className="password-input-container">
                    <input
                        id="passwordSignUp"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-required="true"
                        autoComplete="new-password"
                        className="auth-input"
                        placeholder="Create a password"
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

            <div>
                <label htmlFor="confirmPasswordSignUp" className="auth-label">Confirm Password</label>
                <div className="password-input-container">
                    <input
                        id="confirmPasswordSignUp"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        aria-required="true"
                        autoComplete="new-password"
                        className="auth-input"
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        className="password-toggle-button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="auth-checkbox-container">
                <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="auth-checkbox"
                    aria-describedby="terms-description"
                />
                <label htmlFor="terms" id="terms-description" className="auth-checkbox-label">
                    I agree to the{" "}
                    <a href="#" className="font-bold">
                        Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-bold">
                        Privacy Policy
                    </a>
                </label>
            </div>

            <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <LoadingSpinner size="small" className="button-spinner" />
                        <span>Signing Up...</span>
                    </>
                ) : 'Sign Up'}
            </button>

            {error && <p className="auth-error-message" role="alert">{error.message}</p>}
            {message && <p className="auth-info-message" role="status">{message}</p>}
        </form>
    );
};

export default SignUpForm; 