"use client";

import { useEffect } from "react";

/**
 * CopyProtection component:
 * Prevents unauthorized copying of website text, right-click context menu,
 * and key shortcuts (Ctrl+C, Ctrl+X, Ctrl+U, Ctrl+S, Ctrl+P, F12).
 * Form inputs, search boxes, and textareas remain fully functional for user interaction.
 */
export function CopyProtection() {
  useEffect(() => {
    // 1. Prevent Right-Click Context Menu (except in input / textarea)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return; // Allow context menu in form fields if needed
      }
      e.preventDefault();
      return false;
    };

    // 2. Prevent Copy and Cut Events on page text
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return; // Allow copying inside inputs/textareas
      }
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.clearData();
      }
      return false;
    };

    const handleCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      return false;
    };

    // 3. Prevent Copy/Inspect Key Combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // Disable Ctrl+C / Cmd+C (Copy) outside form inputs
      if (isCtrlOrCmd && (e.key === "c" || e.key === "C") && !isInput) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+X / Cmd+X (Cut) outside form inputs
      if (isCtrlOrCmd && (e.key === "x" || e.key === "X") && !isInput) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U / Cmd+U (View Source)
      if (isCtrlOrCmd && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S / Cmd+S (Save Page)
      if (isCtrlOrCmd && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P / Cmd+P (Print Page)
      if (isCtrlOrCmd && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        return false;
      }

      // Disable F12 / DevTools Shortcut (Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C)
      if (
        e.key === "F12" ||
        (isCtrlOrCmd && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c"))
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Prevent Drag Selection of Images and Text
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
