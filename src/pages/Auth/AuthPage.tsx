import React, { useState } from "react";
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import SignUpForm from '../../components/auth/SignUpForm';
import { NewTerraLogo } from "../../components/ui/NewTerraLogo";
import './AuthPage.css'; // Import the CSS file

/**
 * AuthPage component serves as the main container for authentication forms (Login and Sign Up).
 * It allows users to toggle between the Login and Sign Up views.
 */
const AuthPage = () => {
    const [isSignUpView, setIsSignUpView] = useState(false);

    /**
     * Toggles the view between Sign Up and Login forms.
     */
    const toggleForm = () => {
        setIsSignUpView(!isSignUpView);
    };

    return (
        <div className="auth-page-container">
            {/* Logo */}
            <div className="auth-logo-container">
                <NewTerraLogo />
            </div>

            {/* Logo text */}
            <div className="auth-logo-text">NEWTERRA</div>

            {/* Page title */}
            <h1 className="auth-title">
                {isSignUpView ? "Join NewTerra" : "Welcome Back"}
            </h1>

            {/* Form container */}
            <div className="auth-form-wrapper">
                {isSignUpView ? <SignUpForm /> : <LoginForm />}
                {/* Toggle between sign-up and sign-in */}
                <div className="auth-toggle-text">
                    {isSignUpView ? (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="auth-toggle-button"
                            >
                                Sign In
                            </button>
                        </>
                    ) : (
                        <>
                            Don't have an account yet?{" "}
                            <button
                                type="button"
                                onClick={toggleForm}
                                className="auth-toggle-button"
                            >
                                Sign Up
                            </button>
                            {/* Forgot Password link is only on Login view as per image */}
                            <Link to="/forgot-password" className="auth-forgot-password-link">
                                Forgot Password?
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="auth-footer">
                © {new Date().getFullYear()} NewTerra •{" "}
                <a href="#" className="auth-footer-link">
                    Help
                </a>{" "}
                •{" "}
                <a href="#" className="auth-footer-link">
                    Contact
                </a>
            </div>
        </div>
    );
};

export default AuthPage;