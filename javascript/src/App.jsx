import React from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { useTheme } from './components/ThemeProvider';
import { Header } from './components/Header';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CTASection } from './components/CTASection';
import { P2PFeaturesSection } from './components/P2PFeaturesSection';
import { PartnershipSection } from './components/PartnershipSection';
import { RoadmapSection } from './components/RoadmapSection';
import { TelegramBotSection } from './components/TelegramBotSection';
import { TokenomicsSection } from './components/TokenomicsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { FloatingBot } from './components/FloatingBot';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme} custom-cursor-page`}>
      <CustomCursor />
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-6 pt-20 pb-32">
          <Hero />
          <TelegramBotSection />
          <P2PFeaturesSection />
          <PartnershipSection />
          <TokenomicsSection />
          <RoadmapSection />
          <div className="mt-32">
            <NewsletterSection />
          </div>
        </main>
        <Footer />
        <FloatingBot />
      </div>
    </div>
  );
}

export default App;