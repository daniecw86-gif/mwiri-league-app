import type { Metadata } from "next";
import { Barlow, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";
import InstallBanner from "../components/InstallBanner";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mwiri League",
  description: "Official Mwiri League Application - Fixtures, Results, Standings & More",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mwiri League",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#005696" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1628" },
  ],
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${barlow.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Animated Crystal Background */}
          <div className="crystal-bg" aria-hidden="true">
            <div className="crystal-orb crystal-orb-gold"></div>
            <div className="crystal-orb crystal-orb-white"></div>
          </div>

          <ErrorBoundary>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pb-20 md:pb-0">
                {children}
              </main>
              <Footer />
            </div>
            <InstallBanner />
            <ServiceWorkerRegistration />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
