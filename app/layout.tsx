import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./lib/AuthProvider";
import { DataProvider } from "./lib/DataStore";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dwayne — UI/UX Designer & Full-Stack Developer",
  description:
    "Multi-disciplinary UI/UX Designer and Full-Stack Developer based in Nigeria. Crafting pixel-perfect interfaces and robust applications.",
  keywords: [
    "UI/UX Designer",
    "Full-Stack Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Nigeria",
  ],
  openGraph: {
    title: "Dwayne — Designer & Developer",
    description:
      "Multi-disciplinary creative bridging design and engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <DataProvider>
              {children}
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
