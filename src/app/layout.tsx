import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pitchok.com"),
  title: {
    default: "PitchOK — AI-Powered Idea Validation for Founders",
    template: "%s | PitchOK",
  },
  description:
    "Validate your startup idea in seconds with friendly AI. No complex spreadsheets — just clear, actionable insights. Trusted by 10,000+ founders.",
  keywords: [
    "idea validation",
    "startup validation",
    "AI pitch analysis",
    "market validation",
    "business idea validator",
  ],
  authors: [{ name: "PitchOK" }],
  creator: "PitchOK",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pitchok.com",
    siteName: "PitchOK",
    title: "PitchOK — AI-Powered Idea Validation for Founders",
    description:
      "Validate your startup idea in seconds with friendly AI insights.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchOK — AI-Powered Idea Validation",
    description:
      "Friendly AI validates your startup idea in seconds.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${manrope.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-surface text-on-surface font-body antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
