import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/global/Header'

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
      <body className=''>
        <Header />
        {children}
      </body>
    </html>
  )
}
