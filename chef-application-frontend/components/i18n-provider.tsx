"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, getTranslations, type Translations } from "@/lib/i18n"

interface I18nContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<Translations>(getTranslations("en"))

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && ["en", "es", "fr", "de", "it"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
      setTranslations(getTranslations(savedLanguage))
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    setTranslations(getTranslations(newLanguage))
    localStorage.setItem("language", newLanguage)
  }

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
        t: translations,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
