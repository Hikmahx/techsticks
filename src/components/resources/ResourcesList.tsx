import { ResourceItem, Resource } from '@/lib/types';
import ResourceCard from './ResourceCard';

interface ResourceListProps {
  resources: ResourceItem[];
  bookmarks: string[];
  toggleBookmark: (itemId: string) => void;
  tagList: (tag: string) => JSX.Element;
  resource: Resource;
  showSubsection: boolean;
}

export function ResourceList({ resources, bookmarks, toggleBookmark, tagList, resource, showSubsection }: ResourceListProps) {
  const groupedBySubsection = resources.reduce((acc, item) => {
    const subsection = item.subsection || 'General';
    if (!acc[subsection]) acc[subsection] = [];
    acc[subsection].push(item);
    return acc;
  }, {} as Record<string, ResourceItem[]>);

  if (showSubsection) {
    return (
      <>
        {Object.entries(groupedBySubsection).map(([subsection, items]) => (
          <div
            key={subsection}
            className='my-16 max-w-2xl mx-auto lg:max-w-7xl px-4 lg:px-0 flex flex-col items-center'
          >
            <h2 className='text-2xl lg:text-3xl font-bold mr-auto mb-8 font-quicksand relative before:absolute before:w-full before:h-1 before:bg-primary before:rounded-full before:bottom-0'>
              {subsection}
            </h2>
            <div className='gap-8 mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap items-center justify-center'>
              {items.map((item, index) => (
                <ResourceCard
                  key={index}
                  index={index}
                  item={item}
                  bookmarks={bookmarks}
                  toggleBookmark={toggleBookmark}
                  tagList={tagList}
                  resource={resource}
                />
              ))}
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <div className='max-w-2xl mx-auto lg:max-w-7xl px-4 lg:px-0 flex items-center justify-center'>
        <div className='gap-8 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap items-center justify-center'>
          {resources.map((item, index) => (
            <ResourceCard
              key={index}
              index={index}
              item={item}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
              tagList={tagList}
              resource={resource}
            />
          ))}
        </div>
      </div>
    );
  }
}