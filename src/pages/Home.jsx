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
        title="Software & IA"
        description="Desarrollo de software a medida y soluciones potenciadas por Inteligencia Artificial. Diseñamos el futuro digital de tu empresa con tecnología disruptiva."
        keywords="Desarrollo de Software, Inteligencia Artificial, Apps a Medida, Transformación Digital, Diseño Premium"
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