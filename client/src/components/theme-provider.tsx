import { ThemeProvider as NextThemesProvider, type ThemeProviderProps, useTheme as useNextTheme } from "next-themes"

export function useTheme() {
  return useNextTheme()
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem storageKey="care-soul-theme" {...props}>
      {children}
    </NextThemesProvider>
  )
}
