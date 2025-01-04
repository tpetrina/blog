import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function that combines Tailwind CSS classes with proper merging behavior.
 * Uses clsx for conditional class joining and tailwind-merge to properly handle
 * Tailwind class conflicts.
 *
 * @param inputs - Array of class values that can include strings, objects, or arrays
 * @returns Merged className string with properly handled Tailwind classes
 * @example
 * cn('p-4', 'bg-red-500', { 'text-white': true }) // => 'p-4 bg-red-500 text-white'
 * cn('p-2 bg-red-500', 'p-4') // => 'p-4 bg-red-500' (p-4 overrides p-2)
 */

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
