import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'

export const metadata: Metadata = {
  title: 'Tech Sticks',
  description: 'Finding tech gems, one stick at a time',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='font-sans font-normal'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
