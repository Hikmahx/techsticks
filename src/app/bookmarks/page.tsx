'use client';
import { useState, useEffect } from 'react';
import { getAllResources } from '@/lib/resources';
import { ResourceItem } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bookmark } from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarkedResources, setBookmarkedResources] = useState<ResourceItem[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      const bookmarkIds = JSON.parse(storedBookmarks);
      const allResources = getAllResources();
      const bookmarked = allResources.flatMap(resource => 
        resource.resources.filter(item => bookmarkIds.includes(item.title))
      );
      setBookmarkedResources(bookmarked);
    }
  }, []);

  const toggleBookmark = (itemId: string) => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    
    if (bookmarks.includes(itemId)) {
      bookmarks = bookmarks.filter((id: string) => id !== itemId);
    } else {
      bookmarks.push(itemId);
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    const allResources = getAllResources();
    const updatedBookmarked = allResources.flatMap(resource => 
      resource.resources.filter(item => bookmarks.includes(item.title))
    );
    setBookmarkedResources(updatedBookmarked);
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='bg-blue-700 lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
          Bookmarks
        </h1>
      </div>
      {bookmarkedResources.length > 0 ? (
        <div className='product-container max-w-2xl mx-auto lg:max-w-7xl px-4 lg:px-0 flex items-center'>
          <div className='gap-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap items-center justify-center'>
            {bookmarkedResources.map((item, index) => (
              <Card key={index} className='border pb-6 relative max-w-[18rem]'>
                <div className='absolute -top-8 mt-4 left-6'>
                  {item.imageUrl ? (
                    <div className='w-10 h-10 rounded-full bg-primary z-10 flex items-center justify-center'>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className='w-6 h-6 max-w-md m-auto'
                      />
                    </div>
                  ) : (
                    <div className='w-4 h-4 rounded-full bg-primary/75'>
                      {item.title.charAt(0)}
                    </div>
                  )}
                </div>
                <CardContent className='mt-6 py-2'>
                  <CardHeader className='flex flex-row items-center justify-between px-0'>
                    <CardTitle className='text-2xl font-semibold font-quicksand flex-1'>
                      {item.title}
                    </CardTitle>
                    <button onClick={() => toggleBookmark(item.title)} className="focus:outline-none">
                      <Bookmark className="w-4 h-4 m-auto fill-current text-blue-600" />
                    </button>
                  </CardHeader>
                  <p className='mb-2 text-sm'>{item.description}</p>
                  <a
                    href={item.link}
                    className='text-blue-900 text-xs font-bold hover:underline mb-2 block'
                  >
                    {item.link}
                  </a>
                  <p className='text-xs text-gray-600'>Level: {item.level}</p>
                  <p className='text-xs text-gray-600'>
                    Subsection: {item.subsection}
                  </p>
                </CardContent>
                <CardFooter className='flex items-center space-x-2 mt-4 pb-0'>
                  {item.tags.map((tag) => (
                    <span key={tag} className='bg-yellow-400/50 text-[10px] px-2 font-quicksand rounded-sm'>
                      {tag}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center mt-8">No bookmarked resources yet.</p>
      )}
    </div>
  );
}