import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO, JSON_LD_SCHEMA } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spade-kun.github.io"),
  title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
  description: `${PERSONAL_INFO.shortBio} Full-stack web platforms, Java systems, and game engines.`,
  keywords: [
    "Noel Raterta Jr.",
    "Spade-kun",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js Portfolio",
    "React Developer",
    "Java Developer",
    "Bukidnon State University",
    "Philippines Developer"
  ],
  authors: [{ name: PERSONAL_INFO.name, url: "https://spade-kun.github.io/" }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spade-kun.github.io/",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.shortBio,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [
      {
        url: "/assets/Picture.png",
        width: 1200,
        height: 630,
        alt: PERSONAL_INFO.name,
      },
    ],
  },
  icons: {
    icon: "/assets/favicon.ico",
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
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SCHEMA) }}
        />
      </head>
      <body className="min-h-screen bg-[#060608] text-[#ededf0] antialiased">
        {children}
      </body>
    </html>
  );
}
