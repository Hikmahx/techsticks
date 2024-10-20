'use client';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { filterResources, getAllResources } from '@/lib/resources';
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
  const allResources = getAllResources();
  const resource = allResources.find((r) => r.slug === params.slug);

  if (!resource) {
    notFound();
  }

  const filteredResources = filterResources(
    {
      search,
      tags: tagsArray,
      sortBy,
      level,
    },
    [resource]
  );

  const filteredResource = filteredResources.find(
    (r) => r.slug === params.slug
  );

  const [showSubsection, setShowSubsection] = useState<boolean>(true);
  const { bookmarks, toggleBookmark, tagList } = useResourceManagement();

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='bg-primary lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
          {resource.name}
        </h1>
      </div>
      <ResourcesForm
        showSubsection={showSubsection}
        setShowSubsection={setShowSubsection}
      />
      {filteredResource && filteredResource.resources.length > 0 ? (
        <ResourceList
          resources={filteredResource.resources}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
          tagList={tagList}
          resource={filteredResource}
          showSubsection={showSubsection}
        />
      ) : (
        <div className='text-center mt-8 p-4'>
          <p className='text-lg font-semibold text-gray-900'>
            No resources found
          </p>
          <p className='text-gray-600'>Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
}
