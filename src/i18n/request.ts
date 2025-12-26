import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export type Locale = "en" | "bn";
export const locales: Locale[] = ["en", "bn"];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async () => {
  let locale: Locale = defaultLocale;
  
  try {
    const cookieStore = await cookies();
    locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;
  } catch {
    // Fallback for Cloudflare Workers edge environment
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
