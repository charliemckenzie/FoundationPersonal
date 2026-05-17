import type { Metadata } from "next";
import { Noto_Sans, Open_Sans, Merriweather } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Foundation",
  description: "Design system component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${openSans.variable} ${merriweather.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
