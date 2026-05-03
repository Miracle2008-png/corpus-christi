import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: {
    default: "Corpus Christi — Catholic Ministry Platform",
    template: "%s | Corpus Christi",
  },
  description:
    "A sacred Catholic digital platform for prayers, saints, sacraments, daily readings, and spiritual growth. Free, offline-first, for all Catholics worldwide.",
  keywords: [
    "Catholic", "saints", "prayers", "rosary", "sacraments",
    "daily readings", "stations of the cross", "Catholic app",
  ],
  authors: [{ name: "Corpus Christi Ministry" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Corpus Christi",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Corpus Christi — Catholic Ministry Platform",
    description: "A sacred digital platform for the Catholic faithful.",
    siteName: "Corpus Christi",
  },
};

export const viewport: Viewport = {
  themeColor: "#1A2744",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-parchment">
        <PWARegister />
        <Navbar />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
