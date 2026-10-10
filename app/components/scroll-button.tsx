"use client";

import type { ReactNode } from "react";

export function ScrollButton({ target, className, children, focus = false }: { target: string; className?: string; children: ReactNode; focus?: boolean }) {
  return (
    <button type="button" className={className} onClick={() => {
      const element = document.getElementById(target);
      if (!element) return;
      element.scrollIntoView({ behavior: focus || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      if (focus) element.focus({ preventScroll: true });
    }}>{children}</button>
  );
}
