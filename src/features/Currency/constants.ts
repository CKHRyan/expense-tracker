import type { Currency } from "./types";

export const CURRENCY_LIST: Currency[] = [
  {
    unit: "AED",
    name: { en: "United Arab Emirates Dirham", zh: "阿拉伯聯合酋長國迪拉姆" },
  },
  { unit: "AUD", name: { en: "Australian Dollar", zh: "澳元" } },
  { unit: "BRL", name: { en: "Brazilian Real", zh: "巴西雷亞爾" } },
  { unit: "CAD", name: { en: "Canadian Dollar", zh: "加元" } },
  { unit: "CHF", name: { en: "Swiss Franc", zh: "瑞士法郎" } },
  { unit: "CNY", name: { en: "Chinese Yuan", zh: "人民幣" } },
  { unit: "CZK", name: { en: "Czech Koruna", zh: "捷克克朗" } },
  { unit: "DKK", name: { en: "Danish Krone", zh: "丹麥克朗" } },
  { unit: "EGP", name: { en: "Egyptian Pound", zh: "埃及鎊" } },
  { unit: "EUR", name: { en: "Euro", zh: "歐元" } },
  { unit: "GBP", name: { en: "British Pound Sterling", zh: "英鎊" } },
  { unit: "HKD", name: { en: "Hong Kong Dollar", zh: "港元" } },
  { unit: "HUF", name: { en: "Hungarian Forint", zh: "匈牙利福林" } },
  { unit: "IDR", name: { en: "Indonesian Rupiah", zh: "印尼盾" } },
  { unit: "INR", name: { en: "Indian Rupee", zh: "印度盧比" } },
  { unit: "ISK", name: { en: "Icelandic Króna", zh: "冰島克朗" } },
  { unit: "JPY", name: { en: "Japanese Yen", zh: "日圓" } },
  { unit: "KRW", name: { en: "South Korean Won", zh: "韓圓" } },
  { unit: "MAD", name: { en: "Moroccan Dirham", zh: "摩洛哥迪拉姆" } },
  { unit: "MXN", name: { en: "Mexican Peso", zh: "墨西哥比索" } },
  { unit: "MYR", name: { en: "Malaysian Ringgit", zh: "馬來西亞令吉" } },
  { unit: "NOK", name: { en: "Norwegian Krone", zh: "挪威克朗" } },
  { unit: "NZD", name: { en: "New Zealand Dollar", zh: "紐西蘭元" } },
  { unit: "PHP", name: { en: "Philippine Peso", zh: "菲律賓比索" } },
  { unit: "PLN", name: { en: "Polish Zloty", zh: "波蘭茲羅提" } },
  { unit: "QAR", name: { en: "Qatari Riyal", zh: "卡塔爾里亞爾" } },
  { unit: "SAR", name: { en: "Saudi Riyal", zh: "沙特里亞爾" } },
  { unit: "SEK", name: { en: "Swedish Krona", zh: "瑞典克朗" } },
  { unit: "SGD", name: { en: "Singapore Dollar", zh: "新加坡元" } },
  { unit: "THB", name: { en: "Thai Baht", zh: "泰銖" } },
  { unit: "TRY", name: { en: "Turkish Lira", zh: "土耳其里拉" } },
  { unit: "TWD", name: { en: "New Taiwan Dollar", zh: "新台幣" } },
  { unit: "USD", name: { en: "United States Dollar", zh: "美元" } },
  { unit: "VND", name: { en: "Vietnamese Dong", zh: "越南盾" } },
  { unit: "ZAR", name: { en: "South African Rand", zh: "南非蘭特" } },
];

const DEFAULT_CURRENCY_UNIT = "HKD";

export const DEFAULT_CURRENCY = CURRENCY_LIST.find(
  ({ unit }) => unit === DEFAULT_CURRENCY_UNIT,
)!;

export const RATE_PRICISION = 4;
