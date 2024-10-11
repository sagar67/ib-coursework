// pages/index.tsx
import React from 'react';
import FileUpload from '../components/FileUpload';
import CourseworkList from '../components/CourseworkList';
import ExploreCoursework from '../components/ExploreCoursework';

const Home: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log('Uploaded file:', file.name);
  };

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor: '#e5ecf3' }}>
      <h1 className="text-4xl font-bold mb-6">Hey IB Folks! Unsure about the quality of your answers?{' '}
         <span className="text-[#6947bf]">We get you</span>.</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <CourseworkList />
      <ExploreCoursework />
    </div>
  );
};

export default Home;