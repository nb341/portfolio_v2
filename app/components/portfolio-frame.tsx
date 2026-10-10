import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "../content";
import { Navigation } from "./navigation";
import { ScrollButton } from "./scroll-button";

export function PortfolioFrame({ children }: { children: ReactNode }) {
  return <>
    <Navigation />
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="footer shell">
      <Link className="wordmark" href="/" aria-label="NB — Narin Balkissoon home">NB<span>.</span></Link>
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <span>Made with Next.js & Three.js</span>
      <ScrollButton target="main-content" className="text-button">Back to top ↑</ScrollButton>
    </footer>
  </>;
}
