"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "@/store/appStore";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <SunIcon className="h-5 w-5 text-gray-300" />
      )}
    </button>
  );
}
