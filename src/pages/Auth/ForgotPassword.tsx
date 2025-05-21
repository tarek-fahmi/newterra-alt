import React from 'react';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { NewTerraLogo } from '../../components/ui/NewTerraLogo';
import './AuthPage.css';

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="auth-page-container forgot-password-page-container">
            <div className="auth-logo-container">
                <NewTerraLogo />
            </div>

            <div className="auth-logo-text">NEWTERRA</div>

            <div className="auth-form-wrapper forgot-password-form-container">
                <ForgotPasswordForm />
            </div>

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

export default ForgotPasswordPage; 