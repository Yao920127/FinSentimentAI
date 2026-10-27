import { useTranslation } from 'react-i18next'
import { cn } from '../lib/cn'

const LANGUAGES = [
  { code: 'zh-TW', label: '中' },
  { code: 'en', label: 'EN' },
] as const

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  // Normalize any zh-* variant ("zh", "zh-Hant-TW", "zh-CN") to the zh-TW
  // button; everything else is treated as English.
  const lang = i18n.resolvedLanguage ?? i18n.language ?? ''
  const current = lang.toLowerCase().startsWith('zh') ? 'zh-TW' : 'en'

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex rounded-lg border border-border bg-well shadow-well overflow-hidden text-xs"
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => i18n.changeLanguage(l.code)}
          className={cn(
            'h-8 min-w-[2.25rem] px-3 font-medium transition-colors duration-key',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent',
            current === l.code
              ? 'bg-primary text-primary-on'
              : 'text-text-muted hover:bg-surface-2 hover:text-text',
          )}
          aria-pressed={current === l.code ? 'true' : 'false'}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
