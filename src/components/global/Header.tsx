'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


export default function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

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

        <div className='flex items-center space-x-4'>
          <div className='relative hidden sm:block'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-[200px] sm:w-[300px] pl-8'
            />
          </div>

          <div className='sm:hidden'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleSearch}
              className='h-9 w-9 p-0'
            >
              <Search className='h-5 w-5' />
              <span className='sr-only'>Toggle search</span>
            </Button>
          </div>

          <Link
            href='/bookmarks'
            className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9'
          >
            <Bookmark className='h-5 w-5' />
            <span className='sr-only'>Bookmarks</span>
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {isSearchVisible && (
        <div className='sm:hidden px-4 py-2 bg-background border-y'>
          <div className='relative flex items-center'>
            <Search className='absolute left-2.5 h-4 w-4 text-gray-400' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full pl-8 pr-8'
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleSearch}
              className='absolute right-0 h-full p-0'
            >
              <X className='h-4 w-4' />
              <span className='sr-only'>Close search</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
