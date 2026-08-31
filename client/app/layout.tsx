import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import BackgroundStars from "@/components/BackgroundStars";
import Header from "@/components/Header";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chris Alpuerto",
  description:
    "Full stack software engineer focused on backend systems, cloud, DevOps, infrastructure, automation, and building with AI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>
        <BackgroundStars />
        <Header />
        {children}
      </body>
    </html>
  );
}
