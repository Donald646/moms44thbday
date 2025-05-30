import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://moms44thbirthday.com"),
  title: "Moms 44th Birthday",
  description: "Made with love by her children",
  openGraph: {
    title: "Moms 44th Birthday",
    description: "Made with love by her children",
    images: [
      {
        url: "/opengraph-img.JPG",
        width: 1200,
        height: 630,
        alt: "Mom's 44th Birthday Celebration",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moms 44th Birthday",
    description: "Made with love by her children",
    images: ["/opengraph-img.JPG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
