import {
  AvailableResources,
  HeroSection,
  OpenSourceContribution,
  WhyTechSticks,
} from '@/components/home';

export default function Home() {
  return (
    <main className=''>
      <HeroSection />
      <WhyTechSticks />
      <AvailableResources />
      <OpenSourceContribution />
    </main>
  );
}
