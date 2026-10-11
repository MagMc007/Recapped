import { HeroSection } from '@/features/home/components/HeroSection';
import { FilmStrip } from '@/components/FilmStrip';
import { DilemmaSection } from '@/features/home/components/DilemmaSection';

export default function Home() {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <div style={{ width: '100%', zIndex: 3, margin: '10px 0 24px' }}>
        <FilmStrip />
      </div>
      <DilemmaSection />
    </div>
  );
}
