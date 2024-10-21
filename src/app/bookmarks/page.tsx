'use client';
import { useState, useEffect, Suspense } from 'react';
import { filterResources, getAllResources } from '@/lib/resources';
import { ResourceItem } from '@/lib/types';
import { ResourcesForm } from '@/components/global/Filter';
import { useResourceManagement } from '@/components/hooks/useResourceManagement';
import { ResourceList } from '@/components/resources/ResourcesList';

export default function BookmarksPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    search?: string;
    tags?: string;
    sortBy?: 'title' | 'date';
    level?: string;
  };
}) {
  const [bookmarkedResources, setBookmarkedResources] = useState<
    ResourceItem[]
  >([]);
  const { bookmarks, toggleBookmark, tagList } = useResourceManagement();

  useEffect(() => {
    const allResources = getAllResources();
    const bookmarked = allResources.flatMap((resource) =>
      resource.resources.filter((item) => bookmarks.includes(item.title))
    );
    setBookmarkedResources(bookmarked);
  }, [bookmarks]);

  const { search = '', tags = '', sortBy = 'title', level = '' } = searchParams;
  const tagsArray = tags ? tags.split(',') : [];
  const allResources = getAllResources();

  const filteredBookmarks = filterResources(
    {
      search,
      tags: tagsArray,
      sortBy,
      level,
    },
    [
      {
        name: 'Bookmarks',
        resources: bookmarkedResources,
        slug: 'bookmarks',
      },
    ]
  );

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='bg-primary lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
          Bookmarks
        </h1>
      </div>
      <Suspense fallback={<p>Loading bookmarks...</p>}>
        <ResourcesForm isBookmarksPage={true} />
        {filteredBookmarks.length > 0 ? (
          <ResourceList
            resources={filteredBookmarks[0].resources}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            tagList={tagList}
            resource={{
              name: 'Bookmarks',
              resources: filteredBookmarks[0].resources,
              slug: 'bookmarks',
            }}
            showSubsection={false}
          />
        ) : (
          <p className='text-center mt-8'>No bookmarked resources yet.</p>
        )}
      </Suspense>
    </div>
  );
}
