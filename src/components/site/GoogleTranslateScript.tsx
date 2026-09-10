"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export function GoogleTranslateScript() {
  useEffect(() => {
    // Ensure body top is locked to 0
    const resetBodyTop = () => {
      if (document.body && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
      // Remove any banner frame element
      const banners = document.querySelectorAll(
        ".goog-te-banner-frame, iframe.goog-te-banner-frame, iframe[id*=':1.container'], iframe[id*=':2.container']"
      );
      banners.forEach((b) => {
        (b as HTMLElement).style.display = "none";
        (b as HTMLElement).style.visibility = "hidden";
        (b as HTMLElement).style.height = "0";
      });
    };

    const intervalId = setInterval(resetBodyTop, 300);

    // Only load script if not already on window
    if (typeof window === "undefined" || window.google?.translate) {
      return () => clearInterval(intervalId);
    }

    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,hi,mr,gu",
              autoDisplay: false,
              layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
            },
            "google_translate_element"
          );
        }
      } catch {
        // Silently ignore translate init errors
      }
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      id="google_translate_element"
      className="hidden"
      style={{ display: "none", visibility: "hidden", height: 0, width: 0 }}
      aria-hidden="true"
    />
  );
}
