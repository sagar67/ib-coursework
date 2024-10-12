// components/ExploreCoursework.tsx
import React from 'react';

const ExploreCoursework: React.FC = () => {

  return (
    <div>
      <div className='border border-[#d6dfe4] rounded-2xl px-5'/>
    <div className="p-5 font-sans">
      <p>The essay identifies and focuses on the knowledge question regarding the resolvability of disputes over knowledge claims within disciplines.</p>
      <div className="mt-5">
        <h2 className='text-xl font-bold mb-2'>Strengths</h2>
        <div className="border border-green-600 p-2 rounded-2xl">
          <p>✅ Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
          <p>✅ Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.</p>
        </div>
      </div>
      
      <div className="mt-5">
        <h2 className='text-xl font-bold mb-2'>Scope of Improvement</h2>
        <div className="border border-yellow-600 rounded-2xl p-2">
          <p>⚠️ Demonstrates a good understanding of the prescribed title and the associated knowledge questions.</p>
          <p>⚠️ Addresses the nature of disputes in both the Natural Sciences and Human Sciences effectively.</p>
        </div>
      </div>
    </div>
    </div>

  );
};

export default ExploreCoursework;
