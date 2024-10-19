import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ResourceItem, Resource } from '@/lib/types';
import { Bookmark } from 'lucide-react';
import Image from 'next/image';

interface ResourceItemProps {
  item: ResourceItem;
  index: number;
  toggleBookmark: any;
  bookmarks: string[];
  tagList: (tag: string) => JSX.Element;
  resource: Resource;
}
export default function ResourceCard({
  item,
  index,
  bookmarks,
  toggleBookmark,
  tagList,
  resource,
}: ResourceItemProps) {
  return (
    <Card key={index} className='border pb-6 relative max-w-[18rem]'>
      <div className='absolute -top-8 mt-4 left-6'>
        {item.imageUrl ? (
          <div className='w-10 h-10 rounded-full bg-primary z-10 flex items-center justify-center'>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={36}
              height={36}
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
        <CardHeader className='flex flex-row items-center justify-between px-0'>
          <CardTitle className='text-2xl font-semibold font-quicksand flex-1'>
            {item.title}
          </CardTitle>
          <button
            onClick={() => toggleBookmark(item.title)}
            className='focus:outline-none'
          >
            <Bookmark
              className={`w-4 h-4 m-auto ${
                bookmarks.includes(item.title)
                  ? 'fill-current text-blue-600'
                  : ''
              }`}
            />
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
        <p className='text-xs text-gray-600'>Subsection: {item.subsection}</p>
      </CardContent>
      <CardFooter className='flex items-center space-x-2 mt-4 pb-0'>
        {item.tags.map((tag) => tagList(tag))}
      </CardFooter>
    </Card>
  );
}
