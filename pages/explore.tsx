// pages/explore.tsx
import React from 'react';
import ExploreCoursework from '../components/ExploreCoursework';

const Explore: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Coursework</h1>
      <ExploreCoursework />
    </div>
  );
};

export default Explore;
