import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react';
import PrimaryNavigation from '@/components/primary-navigation'
import PrimaryFooter from '@/components/primary-footer'
import '@/styles/ton-bootstrap.scss'
import '@/styles/ton-fontawesome.scss'
import '@/styles/styles.scss'

export const metadata: Metadata = {
  title: 'TON Custom Carpentry',
  description: 'Welcome to TON Custom Carpentry. We serve the greater Charlotte, North Carolina area with high quality custom cabinetry.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
      </head>
      <body>
        <div className="container">
          <PrimaryNavigation></PrimaryNavigation>
        </div>
        <div className="container">
          {children}
        </div>
        <div className="container">
          <PrimaryFooter></PrimaryFooter>
        </div>
        <GoogleTagManager gtmId="GTM-NPBGWBZ" />
        <Analytics />
      </body>
    </html>
  )
}
