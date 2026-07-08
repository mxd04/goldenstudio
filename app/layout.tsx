import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Golden Studio | Frizerie Sibiu',
  description: 'Cauți o frizerie în Sibiu? Golden Studio oferă tunsori premium, contur barbă și servicii de îngrijire într-o atmosferă relaxantă. Rezervă acum!',
  keywords: ['frizerie Sibiu', 'tuns barbati Sibiu', 'salon barbati Sibiu', 'salon înfrumusețare Sibiu', 'Golden Studio Sibiu', 'frizer Sibiu', 'salon sibiu', 'tunsori moderne Sibiu', 'îngrijire barbă Sibiu', 'rezervare frizerie Sibiu', 'tuns barbati Sibiu', 'Golden', 'Golden Sibiu', 'Studio', 'frizerie', 'frizerie langa mine', 'frizerie in apropiere', 'frizerie Selimbar', 'tuns Selimbar', 'tuns', 'contur barba', 'barber shop', 'frizerie premium', 'frizerie de top', 'frizerie moderna', 'frizerie cu programare', 'frizerie cu rezervare', 'frizerie cu servicii complete', 'frizerie cu atmosferă relaxantă', 'tuns si spalat sibiu', 'tuns si spalat', 'aranjare par sibiu', 'aranjare par', 'contur barba sibiu', 'contur barba', 'frizerie de calitate', 'frizerie profesionala', 'frizerie cu experienta', 'frizerie cu recenzii bune', 'frizerie recomandata', 'frizerie pentru barbati', 'frizerie pentru femei', 'frizerie pentru copii'],
  authors: [{ name: 'Golden Studio' }],
  openGraph: {
    title: 'Golden Studio | Frizerie Sibiu',
    description: 'Servicii excelente de frizerie in Sibiu. Un vibe fain si tunsori care te vor face sa arati si sa te simti fresh!',
    url: 'https://goldenstudio.ro', // Pune link-ul tău aici
    siteName: 'Golden Studio',
    locale: 'ro_RO',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050506',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    /* suppressHydrationWarning previne erorile cauzate de extensii (AdBlock, Translate, etc.) */
    <html 
      lang="en" 
      className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}
      suppressHydrationWarning
    >
      <body 
        className="font-sans antialiased overflow-x-hidden bg-[#050506]"
        suppressHydrationWarning
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}