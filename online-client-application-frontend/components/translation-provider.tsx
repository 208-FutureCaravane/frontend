"use client"

import { useState, useEffect, type ReactNode } from "react"
import { type Language, TranslationContext, translations, getNestedTranslation, isRTLLanguage } from "@/lib/i18n"

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)

      const isRTL = isRTLLanguage(language)
      document.documentElement.dir = isRTL ? "rtl" : "ltr"
      document.documentElement.lang = language

      if (isRTL) {
        document.body.classList.add("rtl")
        document.body.classList.remove("ltr")
      } else {
        document.body.classList.add("ltr")
        document.body.classList.remove("rtl")
      }
    }
  }, [language, mounted])

  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key)
  }

  const value = {
    language,
    setLanguage,
    t,
    isRTL: isRTLLanguage(language),
  }

  if (!mounted) {
    return (
      <TranslationContext.Provider value={value}>
        <div className="opacity-0 animate-in fade-in duration-200">{children}</div>
      </TranslationContext.Provider>
    )
  }

  return (
    <TranslationContext.Provider value={value}>
      <div className="animate-in fade-in duration-200">{children}</div>
    </TranslationContext.Provider>
  )
}
