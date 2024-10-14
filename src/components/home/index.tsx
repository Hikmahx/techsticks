import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='mx-4 flex justify-center'>
      <div className='container bg-primary text-white overflow-hidden lg:m-4 lg:mx-auto rounded-3xl lg:rounded-[50px]'>
        <div className='mx-auto sm:mr-0 flex flex-col lg:flex-row items-center sm:pl-4 lg:pl-12'>
          <div className='lg:w-[55%] mb-10 lg:mb-0 order-2 lg:order-1 text-center lg:text-left mx-4 lg:mx-0 lg:pr-12 '>
            <h1 className='text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 font-quicksand tracking-wider leading-10'>
              Finding Tech Gems <br /> One Stick At A Time
            </h1>
            <p className='text-md xl:text-lg mb-8 max-w-xl text-gray-100'>
              Step up your tech career with all the resources you need. Tech
              Sticks provides a curated collection of tools, articles,
              communities, and more across various tech fields.
            </p>
            <Button
              size='lg'
              className='bg-yellow-400 text-zinc-800 font-quicksand hover:bg-yellow-300 font-semibold'
            >
              Explore Resources
            </Button>
          </div>
          <div className='w-full lg:flex-1 relative lg:order-2'>
            <div className='max-w-xs ml-auto'>
              <Image
                src='/hero-img-mobile.svg'
                alt='Tech Icons Illustration'
                width={500}
                height={500}
                className='w-full lg:hidden'
              />
            </div>
            <Image
              src='/hero-img-laptop.svg'
              alt='Tech Icons Illustration'
              width={500}
              height={500}
              className='w-full h-auto hidden lg:block'
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyTechSticks() {
    return (
      <section className='container mx-auto px-4 py-12 text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>Why TechSticks?</h2>
        <div className=''>
          <Card className='border-none shadow-none'>
            <CardContent className='flex flex-col md:flex-row md:items-center md:space-x-8 px-6 py-2 md:py-4'>
              <div className='md:w-1/2 order-1 md:order-[0]'>
                <h3 className='text-xl md:text-2xl font-bold mb-4'>Frustrated About Not Finding The Right Resources?</h3>
                <p className='text-muted-foreground'>
                  Finding the right tech resources often feels like assembling a
                  complex puzzle with missing pieces. Hours of searching leave
                  you overwhelmed, while wasting time on irrelevant or
                  outdated information.
                </p>
              </div>
              <div className='md:w-1/2 mt-6 md:mt-0'>
                <div className='bg-[#ffe5e5] rounded-3xl p-8 flex justify-center items-center mb-4 lg:mb-0'>
                  <div className='relative p-4 overflow-hidden'>
                  <Image src='/frustrated-figure.svg' alt='frustrated figure in front of a laptop' width={400} height={500} className='w-full max-w-[15rem] mx-auto'/>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='border-none shadow-none'>
            <CardContent className='flex flex-col md:flex-row md:items-center md:space-x-8 px-6 py-2 md:py-4'>
              <div className='md:w-1/2 order-1 mt-6 md:mt-0'>
                <div className='bg-[#ffe5b4] rounded-3xl p-8 flex justify-center items-center mb-4 lg:mb-0'>
                  <div className='relative p-4 overflow-hidden'>
                    <Image src='/step-up.svg' alt='stick figure taking victorious steps' width={400} height={500} className='w-full max-w-[16rem] mx-auto'/>
                  </div>
                </div>
              </div>
              <div className='md:w-1/2 order-1 md:order-2'>
                <h3 className='text-xl md:text-2xl font-bold mb-4'>Step Up with the Right Tech Resources</h3>
                <p className='text-muted-foreground'>
                  TechSticks offers a curated bundle of top-tier resources,
                  handpicked by experienced developers. Our easy-to-navigate
                  platform helps both beginners and experts build tech skills
                  efficiently, one stick at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
}

type ResourceItem = {
  id: string
  name: string
  icon: string
  resourceCount: number
}

const resourceItems: ResourceItem[] = [
  { id: 'ai', name: 'AI', icon: '/resources/ai.svg', resourceCount: 12 },
  { id: 'web-development', name: 'Web Development', icon: '/resources/web-development.svg', resourceCount: 17 },
  { id: 'accessibility', name: 'Accessibility', icon: '/resources/accessibility.svg', resourceCount: 6 },
  { id: 'testing', name: 'Testing', icon: '/resources/testing.svg', resourceCount: 17 },
  { id: 'community', name: 'Community', icon: '/resources/community.svg', resourceCount: 17 },
  { id: 'design', name: 'Design', icon: '/resources/design.svg', resourceCount: 17 },
]

const ResourceCard = ({ resource }: { resource: ResourceItem }) => (
  <Link href={`/resources/${resource.id}`} className='block'>
  <Card className='overflow-hidden transition-all hover:shadow-lg bg-primary/20 hover:bg-primary/30 fill-red-50 hover:stroke-yellow-30 border-none'>
    <CardContent className='p-6'>
      <div className='flex flex-col items-center text-center'>
        <Image src={resource.icon} alt={resource.name} width={80} height={80} className='mb-4' />
        <h3 className='text-lg font-semibold mb-2'>{resource.name}</h3>
        <p className='text-sm text-muted-foreground'>{resource.resourceCount} Resources</p>
      </div>
    </CardContent>
  </Card>
  </Link>
)

export function AvailableResources() {
  return (
    <div className='bg-gray-50'>
    <section className='container mx-auto px-4 py-12'>
      <div className='flex justify-between items-start mb-8 gap-x-8'>
        <h2 className='text-2xl md:text-3xl font-bold'>Available Resource Section</h2>
        <Button variant='secondary' className='bg-yellow-400 text-black hover:bg-yellow-500'>View All</Button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {resourceItems.map((item) => (
          <ResourceCard key={item.id} resource={item} />
        ))}
      </div>
    </section>
    </div>
  )
}