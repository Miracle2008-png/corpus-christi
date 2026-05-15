import type { Metadata, Viewport } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PWARegister from "@/components/PWARegister";
import { Providers } from "@/components/Providers";
import { auth } from "@/lib/auth";

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
    images: [{ url: "/images/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corpus Christi — Catholic Ministry Platform",
    description: "A sacred digital platform for the Catholic faithful.",
    images: ["/images/og-image.jpg"],
  },
  metadataBase: new URL("https://corpus-christi.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#1A2744",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-parchment">
        <Providers session={session}>
          <PWARegister />
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
