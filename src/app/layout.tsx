import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import { Toaster } from '@/components/ui/toaster'

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
        <div className='min-h-[85vh]'>
          {children}
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
