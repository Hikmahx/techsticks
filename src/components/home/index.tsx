import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className='mx-4 flex justify-center'>
      <div className='container bg-primary text-white overflow-hidden lg:m-4 lg:mx-auto rounded-3xl lg:rounded-[50px]'>
        <div className='mx-auto sm:mr-0 flex flex-col lg:flex-row items-center sm:pl-4 lg:pl-12'>
          <div className='lg:w-3/5 mb-10 lg:mb-0 order-2 lg:order-1 text-center lg:text-left mx-4 lg:mx-0 lg:pr-12 '>
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
