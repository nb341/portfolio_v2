import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./expressive.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Narin Balkissoon | Full-Stack Engineer",
  description: "Full-stack engineer with cloud and platform depth. Explore production work in React, .NET, AWS, observability, and accessible interfaces.",
  openGraph: { title: "Narin Balkissoon | Full-Stack Engineer", description: "A software engineer who loves figuring things out, building useful tools, and learning along the way.", type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
