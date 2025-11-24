'use client';
import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative cursor-pointer"
        >
                {theme === "dark" ? (
                    <Sun className="h-8 w-8" />
                ) :
                    (
                        <Moon className="h-8 w-8" />
                    )
                }

        </Button>
    );
}
