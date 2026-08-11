import React from 'react';
import PublicLayout from '../../layouts/PublicLayout.jsx';
import About from '../../components/home/About.jsx';

const AboutPage = () => (
  <PublicLayout>
    <div className="pt-20 lg:pt-24">
      <About />
    </div>
  </PublicLayout>
);

export default AboutPage;
