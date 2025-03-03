import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const DARK_MODE_KEY = "is-dark-mode";

const ThemeToogle = () => {
    useEffect(() => {
        // Initial theme setup
        const isDarkMode = localStorage.getItem(DARK_MODE_KEY);
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        if (isDarkMode === null) {
            // No preference stored, use system preference
            document.documentElement.classList.toggle("dark", darkModeMediaQuery.matches);
        } else {
            // Use stored preference
            document.documentElement.classList.toggle("dark", isDarkMode === "true");
        }

        // Handle view transitions
        document.addEventListener("astro:after-swap", () => {
            // Re-apply theme after page transition
            const currentTheme = localStorage.getItem(DARK_MODE_KEY);
            if (currentTheme !== null) {
                document.documentElement.classList.toggle("dark", currentTheme === "true");
            } else {
                // Use system preference if no stored preference
                document.documentElement.classList.toggle("dark", darkModeMediaQuery.matches);
            }
        });
    });

    const disableTransitionsTemporarily = () => {
        document.documentElement.classList.add("[&_*]:!transition-none");
        window.setTimeout(() => {
            document.documentElement.classList.remove("[&_*]:!transition-none");
        }, 0);
    };

    const toggleMode = () => {
        disableTransitionsTemporarily();

        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const isSystemDarkMode = darkModeMediaQuery.matches;
        const isDarkMode = document.documentElement.classList.toggle("dark");

        if (isDarkMode === isSystemDarkMode) {
            localStorage.removeItem(DARK_MODE_KEY);
        } else {
            localStorage.setItem(DARK_MODE_KEY, isDarkMode.toString());
        }
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleMode}
            className="cursor-pointer transition-all duration-300"
        >
            <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-5 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export { ThemeToogle };
