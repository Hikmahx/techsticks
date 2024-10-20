'use client';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { filterResources } from '@/lib/resources';
import { ResourcesForm } from '@/components/global/Filter';
import { useResourceManagement } from '@/components/hooks/useResourceManagement';
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

  const [showSubsection, setShowSubsection] = useState<boolean>(true);
  const { bookmarks, toggleBookmark, tagList } = useResourceManagement();

  if (!resource) {
    notFound();
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