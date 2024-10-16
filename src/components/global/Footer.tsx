import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className='w-full py-6 bg-zinc-900 text-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-row justify-between items-center gap-x-12'>
          <div className='mb-4 md:mb-0'>
            <Link href='/' className='flex items-center cursor-pointer'>
              <Image
                src='/logo-white.svg'
                alt='TechSticks Logo'
                width={84}
                height={36}
                className='w-auto h-8 sm:h-9'
              />
            </Link>
          </div>
          <div className='text-sm text-right md:text-center'>©2024 TechSticks. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
