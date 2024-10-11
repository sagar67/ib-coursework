// components/ExploreCoursework.tsx
import React, { useState } from 'react';

const dummyCoursework = [
  { id: '1', title: 'Essay on Global Warming', category: 'Essay', subject: 'Science' },
  { id: '2', title: 'Research on AI', category: 'Research', subject: 'Computer Science' },
  { id: '3', title: 'Essay on Economic Growth', category: 'Essay', subject: 'Economics' },
  { id: '4', title: 'Research on Quantum Physics', category: 'Research', subject: 'Physics' },
];

const ExploreCoursework: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Essay');

  const filteredCoursework = dummyCoursework.filter((cw) => cw.category === selectedTab);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`p-2 ${selectedTab === 'Essay' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('Essay')}
        >
          Essay
        </button>
        <button
          className={`p-2 ${selectedTab === 'Research' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedTab('Research')}
        >
          Research
        </button>
      </div>

      {/* Coursework Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredCoursework.map((cw) => (
          <div key={cw.id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{cw.title}</h3>
            <p>Subject: {cw.subject}</p>
            <p>Category: {cw.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCoursework;
