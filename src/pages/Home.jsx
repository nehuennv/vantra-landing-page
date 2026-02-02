import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import UnifiedServices from '../components/sections/UnifiedServices';
import Meeting from '../components/sections/Meeting';
import Ecosystem from '../components/sections/Ecosystem';
import FAQ from '../components/sections/FAQ';

import SEO from '../components/layout/SEO';

const Home = () => {
  return (
    <div style={{ '--product-primary': '#EDF246' }}>
      <SEO
        description="Transformamos tu negocio con tecnología de vanguardia. Soluciones digitales para gastronomía, medicina y empresas modernas."
      />

      <Hero />
      <Services />
      <Ecosystem />
      <UnifiedServices />
      <Meeting />
      <FAQ />
    </div>
  );
};

export default Home;