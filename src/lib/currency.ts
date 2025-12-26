/**
 * Currency utility for internationalization
 * Handles currency conversion and formatting based on locale
 */

// Conversion rate: 1 USD = 120 BDT
export const BDT_TO_USD_RATE = 120;

export type CurrencyConfig = {
  code: string;
  symbol: string;
  position: "before" | "after";
};

export const currencyByLocale: Record<string, CurrencyConfig> = {
  en: { code: "USD", symbol: "$", position: "before" },
  bn: { code: "BDT", symbol: "৳", position: "before" },
};

/**
 * Get currency symbol for a given locale
 */
export function getCurrencySymbol(locale: string): string {
  return currencyByLocale[locale]?.symbol || "$";
}

/**
 * Get currency code for a given locale
 */
export function getCurrencyCode(locale: string): string {
  return currencyByLocale[locale]?.code || "USD";
}

/**
 * Convert Bengali numerals to a number
 */
export function bengaliToNumber(bengaliStr: string): number {
  const bengaliDigits: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  const englishStr = bengaliStr
    .replace(/,/g, "")
    .split("")
    .map((char) => bengaliDigits[char] || char)
    .join("");
  return parseInt(englishStr, 10) || 0;
}

/**
 * Convert number to Bengali numerals
 */
export function toBengaliNumber(num: number): string {
  const englishDigits: Record<string, string> = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
  };
  return num
    .toLocaleString("en-IN")
    .split("")
    .map((char) => englishDigits[char] || char)
    .join("");
}

/**
 * Format a BDT amount to the appropriate currency based on locale
 * @param amountInBDT - The amount in BDT (can be a number or Bengali numeral string)
 * @param locale - The current locale ('en' or 'bn')
 * @param includeSymbol - Whether to include the currency symbol (default: true)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amountInBDT: number | string,
  locale: string,
  includeSymbol: boolean = true
): string {
  // Convert to number if it's a string (Bengali numerals)
  const numericAmount =
    typeof amountInBDT === "string" ? bengaliToNumber(amountInBDT) : amountInBDT;

  const config = currencyByLocale[locale] || currencyByLocale.en;

  if (locale === "bn") {
    // Bengali: Show in BDT with Bengali numerals
    const formattedNumber = toBengaliNumber(numericAmount);
    return includeSymbol ? `${config.symbol}${formattedNumber}` : formattedNumber;
  } else {
    // English: Convert to USD and format
    const usdAmount = Math.round(numericAmount / BDT_TO_USD_RATE);
    const formattedNumber = usdAmount.toLocaleString("en-US");
    return includeSymbol ? `${config.symbol}${formattedNumber}` : formattedNumber;
  }
}

/**
 * Format a raw numeric price for display (handles locale-specific numeral conversion)
 * This doesn't do currency conversion, just numeral formatting
 */
export function formatPriceNumerals(bengaliPrice: string, locale: string): string {
  if (locale === "bn") return bengaliPrice;

  // Convert Bengali numerals to English
  const bengaliDigits: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  return bengaliPrice
    .split("")
    .map((char) => bengaliDigits[char] || char)
    .join("");
}
