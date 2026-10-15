import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LangProvider } from "@/context/LangContext";
import { AppProvider } from "@/context/AppContext";
import ToastContainer from "@/components/Toast";
import ScrollTop from "@/components/ScrollTop";

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
  title: "AI Compare — En İyi Yapay Zeka Araçları",
  description:
    "Yapay zeka araçlarını karşılaştır, keşfet, en iyisini seç. ChatGPT, Claude, Midjourney ve daha fazlası.",
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
            </AppProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}