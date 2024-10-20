'use client';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { filterResources } from '@/lib/resources';
import { ResourcesForm } from '@/components/global/Filter';
import { toast } from '@/components/hooks/use-toast';
import { ResourceList } from '@/components/resources/ResourcesList';

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
    const tag = e.currentTarget.dataset.tools;
    if (tag) {
      const currentTags = new Set(tagsArray);
      if (currentTags.has(tag)) {
        currentTags.delete(tag);
      } else {
        currentTags.add(tag);
      }
      const newTags = Array.from(currentTags);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('tags', newTags.join(','));
      window.location.search = newSearchParams.toString();
    }
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
      <ResourceList
        resources={resource.resources}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        tagList={tagList}
        resource={resource}
        showSubsection={showSubsection}
      />
    </div>
  );
}