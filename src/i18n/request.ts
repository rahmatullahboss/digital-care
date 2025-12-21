import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export type Locale = "bn" | "en";
export const locales: Locale[] = ["bn", "en"];
export const defaultLocale: Locale = "bn";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
