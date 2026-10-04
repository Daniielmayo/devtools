import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "DevTools | Soluciones Tecnológicas y Ciclo de Vida del Software",
    template: "%s | DevTools",
  },
  description:
    "Estudio de ingeniería de software especializado en el desarrollo a medida, arquitectura escalable y gestión integral del ciclo de vida del software.",
  keywords: [
    "DevTools",
    "Desarrollo de Software",
    "Ingeniería de Software",
    "Ciclo de Vida del Software",
    "SaaS",
    "Next.js",
    "Arquitectura Cloud",
    "Desarrollo Web",
    "Apps Móviles",
  ],
  authors: [{ name: "DevTools Team" }],
  creator: "DevTools",
  publisher: "DevTools",
  metadataBase: new URL("https://devtools.tech"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://devtools.tech",
    title: "DevTools | Soluciones Tecnológicas y Ciclo de Vida del Software",
    description:
      "Ingeniería de software a medida, arquitectura limpia y acompañamiento completo en todo el ciclo de vida del software.",
    siteName: "DevTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools | Soluciones Tecnológicas",
    description:
      "Transformamos ideas en productos digitales escalables y de alta calidad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-brand-navy antialiased selection:bg-brand-lime selection:text-brand-navy">
        {children}
      </body>
    </html>
  );
}
