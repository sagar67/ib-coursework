// components/FileUpload.tsx
'use client'; // Mark as a client component

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [courseworkType, setCourseworkType] = useState<string>('Coursework Type');
  const [subject, setSubject] = useState<string>('Subject');
  const [title, setTitle] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string, size: number, type: string }[]>([]);

  // Use a ref to reference the input field
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Retrieve the uploaded files from local storage when the component mounts
    const files = localStorage.getItem('uploadedFiles');
    if (files) {
      setUploadedFiles(JSON.parse(files));
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // Reset the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    onFileUpload(file);

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgress(progress);
      } else {
        clearInterval(uploadInterval);
          setUploadProgress(0);
        setUploadStatus('Uploaded');
        setTimeout(() => {
          setUploadStatus(null);
        }, 2000);
        
        // Update local storage
        const newFile = { name: file.name, size: file.size, type: file.type };
        const updatedFiles = [...uploadedFiles, newFile];
        setUploadedFiles(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      }
    }, 100); // Simulate a file upload time of 1 second
  };

  return (
    <div className="bg-[#f5f7fa] p-6 rounded-3xl shadow-md mb-14 mt-14">
      <div
        className="border-dashed border-2 bg-white border-[#cec4eb] p-6 text-center cursor-pointer rounded-xl"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FontAwesomeIcon icon={faFileUpload} className="h-10 w-10 mx-auto text-gray-400 mt-12" />
        <p className="text-gray-500 text-2xl">Drag and drop a PDF</p>
        <p className="text-gray-500 text-base">*Limit 25 MB per file</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef} // Attach ref to input element
        />
        <button
          className="my-12 px-8 py-2 bg-white text-[#6947bf] font-bold text-lg rounded-3xl border-2 border-[#cec4eb]"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload your file
        </button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 text-lg font-semibold">Uploaded Files:</h3>
          <ul className="list-disc pl-5">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="text-gray-600">{file.name} - {Math.round(file.size / 1024)} KB</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <p className="text-gray-500 text-xl mt-4 mb-2">Select your course & subjects*</p>
        <select
          className="border rounded-xl p-2 px-5 mr-2 text-[#5b6170] font-medium"
          value={courseworkType}
          onChange={(e) => setCourseworkType(e.target.value)}
        >
          <option value="Coursework Type">Coursework Type</option>
          <option value="IA Example">IA Example</option>
          <option value="EE Example">EE Example</option>
          <option value="IO Example">IO Example</option>
          <option value="Tok Example">Tok Example</option>
        </select>
        <select
          className="border rounded-xl p-2 px-5 mr-2 text-[#5b6170] font-medium"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="Subject">Subject</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      <p className="text-gray-500 text-xl mt-4">Enter your essay title*(Required)</p>
      <input
        type="text"
        placeholder="how nation works..."
        className="border rounded-md p-2 mt-4 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">Evaluate Your Score</button>

      {/* Display upload progress and status */}
      {uploadProgress > 0 && (
        <div className="mt-4">
          <p className="text-gray-500">Upload Progress: {uploadProgress}%</p>
          <div className="h-2 w-full bg-gray-300 rounded">
            <div className={`h-full bg-green-500 rounded`} style={{ width: `${uploadProgress}%` }} />
          </div>
          
        </div>
      )}
      {uploadStatus && (
            <p className="text-green-500">{uploadStatus}</p>
          )}
    </div>
  );
};

export default FileUpload;
