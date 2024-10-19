'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark } from 'lucide-react';


export default function Header() {
  return (
    <header className='w-full bg-white'>
      <div className='container mx-auto px-4 flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/logo-lg.svg'
            alt='TechSticks Logo'
            width={84}
            height={36}
            className='w-auto h-8 sm:h-9'
          />
        </Link>
        <Link
          href='/bookmarks'
          className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9'
        >
          <Bookmark className='h-5 w-5' />
          <span className='sr-only'>Bookmarks</span>
        </Link>
      </div>
    </header>
  );
}
