import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const setDocumentViewportHeight = () => {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
