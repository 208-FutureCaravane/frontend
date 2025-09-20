"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} suppressHydrationWarning storageKey="smart-restaurant-theme" enableColorScheme>
      {children}
    </NextThemesProvider>
  )
}
