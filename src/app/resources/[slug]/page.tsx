'use client';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { filterResources } from '@/lib/resources';
import { ResourcesForm } from '@/components/global/Filter';
import { toast } from '@/components/hooks/use-toast';
import ResourceItem from '@/components/resources/ResourceCard';

export default function ResourcePage({
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
  const { search = '', tags = '', sortBy = 'title', level = '' } = searchParams;
  const tagsArray = tags ? tags.split(',') : [];
  const resources = filterResources({
    search,
    tags: tagsArray,
    sortBy,
    level,
  });
  const resource = resources.find((r) => r.slug === params.slug);

  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showSubsection, setShowSubsection] = useState<boolean>(true);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  if (!resource) {
    notFound();
  }

  const tagClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tools = e.currentTarget.dataset.tools;
    console.log(`Clicked on tag: ${tools}`);
  };

  const tagList = (tag: string) => {
    return (
      <button
        key={tag}
        onClick={tagClick}
        data-tools={tag}
        className='bg-yellow-400/50 text-[10px] px-2 font-quicksand rounded-sm'
      >
        {tag}
      </button>
    );
  };

  const toggleBookmark = (itemId: string) => {
    const newBookmarks = bookmarks.includes(itemId)
      ? bookmarks.filter((id) => id !== itemId)
      : [...bookmarks, itemId];

    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));

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

  const groupedBySubsection = resource.resources.reduce((acc, item) => {
    const subsection = item.subsection || 'General';
    if (!acc[subsection]) acc[subsection] = [];
    acc[subsection].push(item);
    return acc;
  }, {} as Record<string, typeof resource.resources>);

  function SubSectionView(resource: any) {
    if (showSubsection) {
      return Object.entries(groupedBySubsection).map(([subsection, items]) => (
        <div
          key={subsection}
          className='my-16 max-w-2xl mx-auto lg:max-w-7xl px-4 lg:px-0 flex flex-col items-center'
        >
          <h2 className='text-2xl lg:text-3xl font-bold mr-auto mb-6 font-quicksand relative before:absolute before:w-full before:h-1 before:bg-primary before:rounded-full before:bottom-0'>
            {subsection}
          </h2>
          <div className='gap-8 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap items-center justify-center'>
            {items.map((item, index) => (
              <>
                <ResourceItem
                  index={index}
                  item={item}
                  bookmarks={bookmarks}
                  toggleBookmark={toggleBookmark}
                  tagList={tagList}
                  resource={resource}
                />
              </>
            ))}
          </div>
        </div>
      ));
    }
  }

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='bg-blue-700 lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
          {resource.name}
        </h1>
      </div>
      <ResourcesForm
        showSubsection={showSubsection}
        setShowSubsection={setShowSubsection}
      />
      {showSubsection ? (
        <div className=''>
          <SubSectionView />
        </div>
      ) : (
        <div className=''>
          {resource.resources && resource.resources.length > 0 ? (
            <div className='max-w-2xl mx-auto lg:max-w-7xl px-4 lg:px-0 flex items-center'>
              <div className='gap-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap items-center justify-center'>
                {resource.resources.map((item, index) => (
                  <>
                    <ResourceItem
                      index={index}
                      item={item}
                      bookmarks={bookmarks}
                      toggleBookmark={toggleBookmark}
                      tagList={tagList}
                      resource={resource}
                    />
                  </>
                ))}
              </div>
            </div>
          ) : (
            <p>No resources available for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}
