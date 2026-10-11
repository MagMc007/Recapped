import { HeroSection } from '@/features/home/components/HeroSection';
import { FilmStrip } from '@/components/FilmStrip';
import { FeaturedSection } from '@/features/home/components/FeaturedSection';
import { DilemmaSection } from '@/features/home/components/DilemmaSection';
import { HowItWorksSection } from '@/features/home/components/HowItWorksSection';
import { CreatorsSection } from '@/features/home/components/CreatorsSection';
import { CtaSection } from '@/features/home/components/CtaSection';

export default function Home() {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <div style={{ width: '100%', zIndex: 3, margin: '8px 0 16px' }}>
        <FilmStrip />
      </div>
      <FeaturedSection />
      <DilemmaSection />
      <HowItWorksSection />
      <CreatorsSection />
      <CtaSection />
    </div>
  );
}
