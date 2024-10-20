'use client';
import { useState, useEffect } from 'react';
import { getAllResources } from '@/lib/resources';
import { ResourceItem } from '@/lib/types';
import { ResourcesForm } from '@/components/global/Filter';
import { useResourceManagement } from '@/components/hooks/useResourceManagement';
import { ResourceList } from '@/components/resources/ResourcesList';



export default function BookmarksPage() {
  const [bookmarkedResources, setBookmarkedResources] = useState<ResourceItem[]>([]);
  const { bookmarks, toggleBookmark, tagList } = useResourceManagement();

  useEffect(() => {
    const allResources = getAllResources();
    const bookmarked = allResources.flatMap(resource => 
      resource.resources.filter(item => bookmarks.includes(item.title))
    );
    setBookmarkedResources(bookmarked);
  }, [bookmarks]);

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
          resource={{ name: 'Bookmarks', resources: bookmarkedResources, slug: 'bookmarks' }}
          showSubsection={false}
        />
      ) : (
        <p className="text-center mt-8">No bookmarked resources yet.</p>
      )}
    </div>
  );
}