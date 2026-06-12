import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

/* Self-hosted via next/font: preloaded, metric-matched fallbacks — removes
   the render-blocking Google Fonts CSS and the font-swap layout shift. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--nf-inter",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--nf-cormorant",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--nf-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itsownlymoney.com"),
  title: "Ownly ONCE — Business, Cash Flow, Capital, AI & Wealth Tools",
  description:
    "Tell us who you are — business owner, restaurant operator, agent, employee, or family — and the Ownly ONCE concierge shows you where the money is hiding. Credit, capital, cash flow, and AI tools under one roof.",
  openGraph: {
    title: "Ownly ONCE — Business, Cash Flow, Capital, AI & Wealth Tools",
    description:
      "One ecosystem, six doors. Business credit, restaurant profit recovery, household cash flow, self-employed escape plans, and AI tools — built around the Six Figure Sit Down.",
    url: "https://itsownlymoney.com",
    siteName: "Ownly ONCE",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ownly ONCE — Business, Cash Flow, Capital, AI & Wealth Tools",
    description:
      "Tell us who you are. We'll show you where the money is hiding.",
    images: ["/og.jpg"],
  },
  alternates: { canonical: "https://itsownlymoney.com/" },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ownly ONCE LLC",
  url: "https://itsownlymoney.com",
  logo: "https://itsownlymoney.com/logo.png",
  founder: { "@type": "Person", name: "Dave Ivery", jobTitle: "Founder · NFEC CFEI · AI Consultant" },
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "david@ownly1nce.com",
    telephone: "+1-941-277-9876",
    areaServed: "US",
    availableLanguage: ["English"],
  }],
  address: { "@type": "PostalAddress", addressLocality: "Sarasota", addressRegion: "FL", addressCountry: "US" },
  sameAs: [
    "https://the-ownly-breakthrough.vercel.app",
    "https://itsownlymoney.com",
    "https://8minuteaudit.com",
    "https://venice50kchallenge.com",
    "https://ownly-business-credit-builder.vercel.app",
    "https://ownly-web-studio.vercel.app",
    "https://ownly-marketing.vercel.app",
    "https://calendly.com/daveivery"
  ],
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ownly ONCE",
  url: "https://itsownlymoney.com",
  publisher: { "@type": "Organization", name: "Ownly ONCE LLC" },
  inLanguage: "en-US",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      </head>
      <body>
        {children}
        <Script id="apollo-tracker" strategy="lazyOnload">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"68000000000000000000"})},document.head.appendChild(o)}initApollo();`}
        </Script>
      </body>
    </html>
  );
}
