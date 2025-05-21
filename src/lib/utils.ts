import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to conditionally join class names.
 * It uses `clsx` to handle conditional classes and `tailwind-merge` to merge Tailwind CSS classes without conflicts.
 * @param inputs - A list of class values (strings, numbers, booleans, objects, arrays).
 * @returns A string of merged and conditioned class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
