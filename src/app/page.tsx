import { AvailableResources, HeroSection, WhyTechSticks } from '@/components/home';

export default function Home() {
  return (
    <div className=''>
      <main className=''>
        <HeroSection />
        <WhyTechSticks />
        <AvailableResources />
      </main>
    </div>
  );
}
