'use client';
import { useState, useEffect } from 'react';
import { getAllResources } from '@/lib/resources';
import { ResourceItem } from '@/lib/types';
import { ResourcesForm } from '@/components/global/Filter';
import { toast } from '@/components/hooks/use-toast';
import { ResourceList } from '@/components/resources/ResourcesList';

export default function BookmarksPage() {
  const [bookmarkedResources, setBookmarkedResources] = useState<
    ResourceItem[]
  >([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      const bookmarkIds = JSON.parse(storedBookmarks);
      setBookmarks(bookmarkIds);
      const allResources = getAllResources();
      const bookmarked = allResources.flatMap((resource) =>
        resource.resources.filter((item) => bookmarkIds.includes(item.title))
      );
      setBookmarkedResources(bookmarked);
    }
  }, []);

  const toggleBookmark = (itemId: string) => {
    const newBookmarks = bookmarks.includes(itemId)
      ? bookmarks.filter((id) => id !== itemId)
      : [...bookmarks, itemId];

    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));

    const allResources = getAllResources();
    const updatedBookmarked = allResources.flatMap((resource) =>
      resource.resources.filter((item) => newBookmarks.includes(item.title))
    );
    setBookmarkedResources(updatedBookmarked);

    if (newBookmarks.includes(itemId)) {
      toast({
        title: 'Bookmark Added',
        description: 'The resource has been added to your bookmarks.',
        className: 'bg-yellow-200 fixed top-4 right-4 w-fit',
      });
    } else {
      toast({
        title: 'Bookmark Removed',
        description: 'The resource has been removed from your bookmarks.',
        className: 'bg-red-200 fixed top-4 right-4 w-fit',
      });
    }
  };

  const tagList = (tag: string) => {
    return (
      <span
        key={tag}
        className='bg-yellow-400/50 text-[10px] px-2 font-quicksand rounded-sm'
      >
        {tag}
      </span>
    );
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='bg-blue-700 lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
          Bookmarks
        </h1>
      </div>
      <ResourcesForm isBookmarksPage={true} />
      {bookmarkedResources.length > 0 ? (
        <ResourceList
          resources={bookmarkedResources}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
          tagList={tagList}
          resource={{
            name: 'Bookmarks',
            resources: bookmarkedResources,
            slug: 'bookmarks',
          }}
          showSubsection={false}
        />
      ) : (
        <p className='text-center mt-8'>No bookmarked resources yet.</p>
      )}
    </div>
  );
}
