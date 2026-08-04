import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
})

const BASE = 'https://ageofai.mastermindshq.business'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'How to Stand Out in the Age of AI',
    template: '%s | How to Stand Out in the Age of AI',
  },
  description:
    "Tiyana Gori's messaging and positioning workshop with editable copy-and-paste prompts throughout.",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    type: 'website',
    url: BASE,
    title: 'How to Stand Out in the Age of AI',
    description:
      "Tiyana Gori's messaging and positioning workshop with editable copy-and-paste prompts throughout.",
    siteName: 'How to Stand Out in the Age of AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Stand Out in the Age of AI',
    description:
      "Tiyana Gori's messaging and positioning workshop with editable copy-and-paste prompts throughout.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-[#151515] text-[#FCF4EB] min-h-screen font-sans antialiased">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="animate-float-slow absolute top-[-20%] left-[8%] h-[520px] w-[520px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #8B79D4 0%, transparent 70%)' }}
          />
          <div
            className="animate-float-slower absolute bottom-[-15%] right-[3%] h-[420px] w-[420px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #F5C3C6 0%, transparent 70%)' }}
          />
          <div
            className="animate-float-slow absolute top-[40%] right-[25%] h-[260px] w-[260px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #9D8FE0 0%, transparent 70%)', animationDelay: '3s' }}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
