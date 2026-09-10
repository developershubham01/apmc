export type Language = "en" | "hi" | "mr" | "gu";

export interface LanguageOption {
  code: Language;
  label: string;
  native: string;
  short: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", native: "English", short: "EN" },
  { code: "hi", label: "Hindi", native: "हिन्दी", short: "HI" },
  { code: "mr", label: "Marathi", native: "मराठी", short: "MR" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી", short: "GU" },
];
