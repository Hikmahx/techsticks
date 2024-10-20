import { Card, CardContent } from '@/components/ui/card';
import { getAllResources } from '@/lib/resources';
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  type ResourceItem = {
    name: string;
    icon: string;
    slug: string;
    resources: any[];
  };

  const ResourceCard = ({ resource }: { resource: ResourceItem }) => (
    <Link href={`/resources/${resource.slug}`} className='block'>
      <Card className='overflow-hidden transition-all hover:shadow-lg bg-primary/20 hover:bg-primary/30 fill-red-50 hover:stroke-yellow-30 border-none'>
        <CardContent className='p-6'>
          <div className='flex flex-col items-center text-center'>
            <Image
              src={resource.icon}
              alt={resource.name}
              width={80}
              height={80}
              className='mb-4'
            />
            <h3 className='text-lg font-semibold mb-2'>{resource.name}</h3>
            <p className='text-sm text-muted-foreground'>
              {resource.resources.length} Resources
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const resourceItems: ResourceItem[] = getAllResources();

  return (
    <div className=''>
      <section className='container mx-auto px-4 py-12'>
        <div className='bg-blue-700 lg:m-4 lg:mx-auto rounded-3xl h-32 flex m-auto items-center justify-center'>
          <h1 className='text-4xl lg:text-6xl font-bold font-quicksand tracking-wider leading-10 text-white text-center'>
            Resources Categories
          </h1>
        </div>
        <div className='mt-12 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {resourceItems.map((item) => (
            <ResourceCard key={item.slug} resource={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
