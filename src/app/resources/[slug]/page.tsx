'use client';
import { notFound } from 'next/navigation';
import {
  getAllResources,
  filterResources,
  createFilterQueryString,
} from '@/lib/resources';
import { useRouter } from 'next/router';
import { ResourcesForm } from '@/components/global/Filter';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

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

  // Split tags string into an array
  const tagsArray = tags ? tags.split(',') : [];


  // Apply filtering based on searchParams (search, tags, sortBy, level)
  const resources = filterResources({
    search,
    tags: tagsArray,
    sortBy,
    level,
  });

  const resource = resources.find((r) => r.slug === params.slug);
    // console.log(resources, search, tagsArray, sortBy, level);
  if (!resource) {
    notFound();
  }

  const tagClick = (e: any) => {
    const tools = e.target.dataset.tools;
    console.log(`Clicked on tag: ${tools}`);
  };

  const tagList = (tag: string[]) => {
    return (
      <button
        onClick={tagClick}
        data-tools={tag}
        className='bg-yellow-400/50 text-[10px] px-2 font-quicksand rounded-sm'
      >
        {tag}
      </button>
    );
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='bg-blue-700 lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
          {resource.name}
        </h1>
      </div>
      <ResourcesForm />
      {resource.resources && resource.resources.length > 0 ? (
        <div className='product-container max-w-2xl mx-auto lg:max-w-7xl px-4 lg:px-0 flex items-center'>
          <div className='gap-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap items-center justify-center'>
            {resource.resources.map((item, index) => (
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
                      {resource.name.charAt(0)}
                    </div>
                  )}
                </div>
                <CardContent className='mt-6 py-2'>
                  <CardTitle className='text-2xl font-semibold mb-2 font-quicksand'>
                    {item.title}
                  </CardTitle>
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
                  {item.tags.map(tagList)}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p>No resources available for this category.</p>
      )}
    </div>
  );
}
