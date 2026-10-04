import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names and resolves Tailwind CSS conflicts
 * @param {...any} inputs - Class values to merge
 * @returns {string} Clean merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
