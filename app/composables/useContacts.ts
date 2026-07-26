/**
 * Contact channels shown in the footer and on the contacts page.
 * Single source of truth so both surfaces stay in sync.
 * TODO: source from CMS / site settings once available.
 */

export interface ContactApp {
  name: string
  /** Iconify name; omitted when no brand icon is bundled (rendered as a text badge). */
  icon?: string
  /** Deep link, when one can be derived reliably (e.g. wa.me). Omitted = display only. */
  href?: string
}

export interface ContactPhone {
  /** Country flag emoji. */
  flag: string
  /** Display form, e.g. '+7 917 122 05 92'. */
  number: string
  /** Digits for the `tel:` link. */
  tel: string
  apps: ContactApp[]
}

export function useContacts() {
  const phones: ContactPhone[] = [
    {
      flag: '🇷🇺',
      number: '+7 917 122 05 92',
      tel: '+79171220592',
      apps: [
        { name: 'WhatsApp', icon: 'i-simple-icons-whatsapp', href: 'https://wa.me/79171220592' },
        { name: 'MAX' },
      ],
    },
    {
      flag: '🇹🇷',
      number: '+90 505 274 29 77',
      tel: '+905052742977',
      apps: [
        { name: 'WhatsApp', icon: 'i-simple-icons-whatsapp', href: 'https://wa.me/905052742977' },
        { name: 'Telegram', icon: 'i-simple-icons-telegram' },
      ],
    },
  ]

  return { phones, email: 'lyfbux@mail.ru' }
}
