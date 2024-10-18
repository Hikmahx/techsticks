'use client';
import { notFound } from 'next/navigation';
import { getAllResources } from '@/resources';
import { useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Resource } from '@/resources/type';

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resources: Resource[] = getAllResources();
  const resource = resources.find((r) => r.slug == params.slug);

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
      {/* {resource.icon && (
        <Image
          src={resource.icon}
          alt={`${resource.name} icon`}
          width={80}
          height={80}
          className='w-16 h-16 mb-6'
        />
      )} */}
      {resource.resources && resource.resources.length > 0 ? (
        <div className='space-y-8 mt-12'>
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
      ) : (
        <p>No resources available for this category.</p>
      )}
    </div>
  );
}
