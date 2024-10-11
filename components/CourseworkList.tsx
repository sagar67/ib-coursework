// components/CourseworkList.tsx
'use client'; // Mark as a client component

import React, { useEffect, useState } from 'react';

interface Coursework {
  title: string;
  subject: string;
  wordCount: number;
  readTime: string;
  fileName: string;
}

const CourseworkList: React.FC = () => {
  const [courseworkList, setCourseworkList] = useState<Coursework[]>([]);

  useEffect(() => {
    const storedCoursework = localStorage.getItem('courseworkList');
    if (storedCoursework) {
      setCourseworkList(JSON.parse(storedCoursework));
    }
  }, []);

  const addCoursework = (file: File) => {
    const newCoursework: Coursework = {
      title: file.name,
      subject: 'Unknown', // Placeholder until you implement the subject input
      wordCount: Math.floor(Math.random() * 1000) + 200, // Dummy word count
      readTime: `${Math.floor(Math.random() * 10) + 1} min read`, // Dummy read time
      fileName: file.name,
    };

    const updatedList = [...courseworkList, newCoursework];
    setCourseworkList(updatedList);
    localStorage.setItem('courseworkList', JSON.stringify(updatedList));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4">My Coursework</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courseworkList.map((coursework, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-bold">{coursework.title}</h3>
            <p>{coursework.subject}</p>
            <p>{coursework.wordCount} words</p>
            <p>{coursework.readTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseworkList;
