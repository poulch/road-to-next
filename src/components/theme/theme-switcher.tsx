"use client";

import { LucideMoon, LucideSun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Button className="relative" variant='outline' size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <LucideMoon className="h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <LucideSun className="absolute h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:rotate-90" />
        </Button>
    )
}