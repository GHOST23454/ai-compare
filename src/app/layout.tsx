import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import { AppProvider } from "@/context/AppContext";
import ToastContainer from "@/components/Toast";
import ScrollTop from "@/components/ScrollTop";
import { Analytics } from "@vercel/analytics/next";
import AIChat from "@/components/AIChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Compare — En İyi Yapay Zeka Araçları 2026",
    template: "%s | AI Compare",
  },
  description:
    "2026'nın en iyi yapay zeka araçlarını karşılaştır, keşfet ve puanla. ChatGPT, Claude, Midjourney, Cursor ve daha fazlası tek bir yerde. Ücretsiz AI araçları rehberi.",
  keywords: [
    "yapay zeka",
    "AI araçları",
    "ChatGPT",
    "Claude",
    "Midjourney",
    "yapay zeka araçları 2026",
    "en iyi AI araçları",
    "ücretsiz AI araçları",
    "AI karşılaştırma",
    "yapay zeka karşılaştırma",
    "Cursor",
    "GitHub Copilot",
    "Suno",
    "ElevenLabs",
  ],
  authors: [{ name: "Kerem Gürgün" }],
  creator: "Kerem Gürgün",
  publisher: "AI Compare",
  metadataBase: new URL("https://ai-compare-hazel.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: "https://ai-compare-hazel.vercel.app",
    siteName: "AI Compare",
    title: "AI Compare — En İyi Yapay Zeka Araçları 2026",
    description:
      "2026'nın en iyi yapay zeka araçlarını karşılaştır, keşfet ve puanla. ChatGPT, Claude, Midjourney ve daha fazlası.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Compare — En İyi Yapay Zeka Araçları 2026",
    description:
      "2026'nın en iyi yapay zeka araçlarını karşılaştır, keşfet ve puanla.",
    creator: "@ghost23454",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7JyHRD6K0KmP9sFAeRvvrFaIyyjko7lSBl2RAn9wLT4",
  },
  category: "technology",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body">
        <ThemeProvider>
          <LangProvider>
            <AppProvider>
              <div className="aurora" />
              {children}
              <ToastContainer />
              <ScrollTop />
              <AIChat />
            </AppProvider>
          </LangProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}