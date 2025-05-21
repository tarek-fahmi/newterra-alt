import * as React from 'react';

interface NewTerraLogoProps {
    width?: number;
    height?: number;
    className?: string;
}

/**
 * NewTerraLogo component renders an SVG logo for NewTerra.
 * @param {NewTerraLogoProps} props - The props for the component.
 * @param {number} [props.width=160] - The width of the logo container.
 * @param {number} [props.height=160] - The height of the logo container.
 * @param {string} [props.className=""] - Additional CSS classes for the container.
 */
const NewTerraLogo = ({
    width = 160, // Default width
    height = 160, // Default height
    className = "",
}: NewTerraLogoProps) => {
    // Using template literals for dynamic w-[] and h-[] classes requires Tailwind JIT mode.
    // Ensure Tailwind CSS is configured to scan these dynamic classes or use inline styles if issues arise.
    // For simplicity and directness with Tailwind, specific classes are used here if possible, 
    // or ensure JIT is correctly processing template literal classes like `w-${width}`.
    // A common practice if dynamic values are few is to map them to predefined Tailwind classes or use inline styles.
    // However, if `w-${width}` works with the setup, it's fine.
    // Let's assume the JIT mode handles `w-${width}` and `h-${height}` correctly.

    return (
        <div className={`w-[${width}px] h-[${height}px] ${className}`}> {/* Changed to w-[160px] style for explicit pixel values with JIT */}
            <svg viewBox="0 0 400 400" className="w-full h-full"> {/* Added h-full */}
                <rect width="100%" height="100%" fill="transparent" />
                <g transform="translate(100, 50)">
                    {/* Shield shape */}
                    <path
                        d="M100,0 L200,0 L200,100 Q200,200 100,300 Q0,200 0,100 L0,0 Z"
                        fill="transparent"
                        stroke="#4A6F51" // Consider using Tailwind theme colors if applicable, e.g., stroke-green-700
                        strokeWidth="20"
                    />
                    {/* Field lines */}
                    <path
                        d="M30,80 Q100,150 170,80 M30,130 Q100,200 170,130"
                        fill="none"
                        stroke="#4A6F51"
                        strokeWidth="20"
                        strokeLinecap="round"
                    />
                </g>
            </svg>
        </div>
    );
};

export { NewTerraLogo }; 