import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://ownly-hub.vercel.app"),
  title: "Ownly ONCE — Find the credit, capital, and AI your business is missing.",
  description:
    "An editorial-luxury holding company for SMB owners, real-estate agents, and individuals. Built around the 6 Figure Sit Down and the F.A.C.T. methodology.",
  openGraph: {
    title: "Ownly ONCE — Own nothing. Control everything.",
    description:
      "A growing ecosystem of financial-education, capital-access, and AI-consulting properties for owners who refuse to leave money on the table.",
    url: "https://ownly-hub.vercel.app",
    siteName: "Ownly ONCE",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ownly ONCE — Own nothing. Control everything.",
    description:
      "An editorial-luxury holding company for SMB owners, real-estate agents, and individuals.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ownly ONCE LLC",
  url: "https://ownly-hub.vercel.app",
  logo: "https://ownly-hub.vercel.app/logo.png",
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
    "https://itsownlymoney.vercel.app",
  ],
};

const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ownly ONCE",
  url: "https://ownly-hub.vercel.app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.png" type="image/png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />
      </head>
      <body>
        {children}
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"6a03527613cf03001b6db951"})},document.head.appendChild(o)}initApollo();`}
        </Script>
      </body>
    </html>
  );
}
