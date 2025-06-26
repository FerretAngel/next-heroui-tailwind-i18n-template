import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "en",
    "ru",
    "fa",
    "vi",
    "tr",
    "ar",
    "fr",
    "es",
    "it",
    "de",
    "ko",
    "id",
    "pl",
    "nl",
    "uk",
    "ja",
    "sv",
    "ms",
    "th",
    "hi",
    "zh-TW",
    "zh-CN",
    "pt-BR"],
  // Used when no locale matches
  defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);