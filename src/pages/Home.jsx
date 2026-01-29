import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import UnifiedServices from '../components/sections/UnifiedServices';
import Meeting from '../components/sections/Meeting';
import Ecosystem from '../components/sections/Ecosystem';
import FAQ from '../components/sections/FAQ';

const Home = () => {
  return (
    <div style={{ '--product-primary': '#EDF246' }}>
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