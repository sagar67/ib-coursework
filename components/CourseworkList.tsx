// components/CourseworkList.tsx
'use client'; // Mark as a client component

import React, { useEffect, useState } from 'react';
import useUploadStore from '../store/uploadStore';

interface Coursework {
  name: string;
  size: number;
}

const CourseworkList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const uploadedFiles = useUploadStore((state) => state.uploadedFiles);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-semibold mb-4">My Coursework</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {uploadedFiles.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-gray-700 text-lg font-semibold">Uploaded Files:</h3>
              <ul className="list-disc pl-5">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-gray-600">
                    {file.name} - {Math.round(file.size / 1024)} KB
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">No uploaded files available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseworkList;
