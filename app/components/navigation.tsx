"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ScrollButton } from "./scroll-button";

const links = [
  { href: "/about", label: "About me" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/approach", label: "Approach" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <>
      <ScrollButton className="skip-link" target="main-content" focus>Skip to content</ScrollButton>
      <noscript><style>{".menu-toggle { display: none !important; } @media (max-width: 800px) { .site-header { position: relative; } .nav { flex-wrap: wrap; padding-block: 16px; } .nav-links { display: flex; position: static; flex-direction: row; flex-wrap: wrap; padding: 0; gap: 12px; border: 0; background: transparent; } .nav-links a { padding: 6px; } .hero { padding-top: 40px; } }"}</style></noscript>
      <header className="site-header">
        <nav className="nav shell" aria-label="Main navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
          <Link className="wordmark" href="/" aria-label="NB — Narin Balkissoon home" onClick={() => setOpen(false)}>
            NB<span>.</span><span className="wordmark-caption">NARIN BALKISSOON</span>
          </Link>
          <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="navigation-links" onClick={() => setOpen(!open)}>
            {open ? "Close −" : "Menu +"}
          </button>
          <div
            className={`nav-links ${open ? "is-open" : ""}`}
            id="navigation-links"
            onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== toggleRef.current) setOpen(false);
            }}
          >
            {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
            <Link className="nav-resume" href="/resume" onClick={() => setOpen(false)}>Résumé ↗</Link>
            <Link className="nav-contact" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link>
          </div>
        </nav>
      </header>
    </>
  );
}
