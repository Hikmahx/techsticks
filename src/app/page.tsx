import {
  AvailableResources,
  HeroSection,
  OpenSourceContribution,
  WhyTechSticks,
} from '@/components/home';

export default function Home() {
  return (
    <div className=''>
      <main className=''>
        <HeroSection />
        <WhyTechSticks />
        <AvailableResources />
        <OpenSourceContribution />
      </main>
    </div>
  );
}
