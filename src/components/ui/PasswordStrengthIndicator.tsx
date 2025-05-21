import * as React from 'react';

interface PasswordStrengthIndicatorProps {
    /**
     * The password string to calculate strength for. 
     * If not provided, `strength` prop must be used.
     */
    password?: string;
    /**
     * A pre-calculated strength value (0-4). 
     * If provided, `password` prop will be ignored for strength calculation.
     */
    strength?: number;
    /** Optional CSS classes for the container. */
    className?: string;
}

/**
 * PasswordStrengthIndicator component displays a visual indicator of password strength.
 * It can either calculate strength based on a given password string or display a pre-calculated strength value.
 */
const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
    password = "",
    strength,
    className = "",
}) => {
    /**
     * Calculates password strength on a scale of 0-4.
     * 0: No password or too short (<=0 chars considered no password here for score)
     * 1: Very weak (1-6 chars)
     * 2: Weak (7-10 chars OR meets some basic criteria like mix of cases/numbers but short)
     * 3: Fair (longer OR good mix of char types)
     * 4: Strong (long AND complex mix of char types)
     * @param pass The password string.
     * @returns A score from 0 to 4.
     */
    const calculateStrength = (pass: string): number => {
        if (!pass || pass.length === 0) return 0;
        let score = 0;
        if (pass.length >= 1) score = 1; // Base for having any password
        if (pass.length > 6) score = 2;

        let checks = 0;
        if (/[A-Z]/.test(pass)) checks++;
        if (/[a-z]/.test(pass)) checks++;
        if (/[0-9]/.test(pass)) checks++;
        if (/[^A-Za-z0-9]/.test(pass)) checks++;

        if (pass.length > 8 && checks >= 2) score = 3;
        if (pass.length > 10 && checks >= 3) score = 4;
        if (pass.length > 12 && checks >= 4) score = 4; // Max strength for very long and complex

        // Ensure minimum scores are met if conditions are very basic
        if (pass.length <= 6 && checks <= 1) score = 1; // Still weak if short and simple

        return Math.min(score, 4);
    };

    const passwordStrength = strength !== undefined ? Math.min(Math.max(strength, 0), 4) : calculateStrength(password);

    const strengthLabels = ["Too Weak", "Weak", "Fair", "Good", "Strong"]; // Index 0 for score 0, up to 4 for Strong
    const strengthColors = [
        "bg-slate-600", // Too weak (score 0 or explicitly too weak)
        "bg-red-500",   // Weak (score 1)
        "bg-orange-400",// Fair (score 2)
        "bg-yellow-400",// Good (score 3)
        "bg-green-500", // Strong (score 4)
    ];

    return (
        <div className={`mt-2 bg-slate-800 ${className}`}> {/* Allow additional classes */}
            <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        className={`h-1 flex-1 rounded-full ${index <= passwordStrength
                                ? strengthColors[passwordStrength] // Direct mapping to color based on score
                                : "bg-slate-600"
                            }`}
                    />
                ))}
            </div>
            <span className="text-xs text-gray-300">
                {/* Display label only if there's a password or strength is explicitly provided */}
                {(password || strength !== undefined) && passwordStrength < strengthLabels.length ? strengthLabels[passwordStrength] : " "}
            </span>
        </div>
    );
};

export { PasswordStrengthIndicator }; 