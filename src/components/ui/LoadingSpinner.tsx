import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    color = '#4361ee',
    className = '',
}) => {
    const sizeClass = `spinner-${size}`;

    return (
        <div
            className={`loading-spinner ${sizeClass} ${className}`}
            style={{ borderColor: `${color}20`, borderTopColor: color }}
        ></div>
    );
};

export default LoadingSpinner; 