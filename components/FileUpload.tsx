// components/FileUpload.tsx
'use client'; // Mark as a client component

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import useUploadStore from '../store/uploadStore';

const FileUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [courseworkType, setCourseworkType] = useState<string>('Coursework Type');
  const [subject, setSubject] = useState<string>('Subject');
  const [title, setTitle] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadedFiles = useUploadStore((state) => state.uploadedFiles);
  const addFile = useUploadStore((state) => state.addFile);
  const [addedFile, setAddedFile] = useState<string | null>(null);

  useEffect(() => {
    const files = localStorage.getItem('uploadedFiles');
    if (files) {
      const parsedFiles = JSON.parse(files);
      parsedFiles.forEach((file: { name: string; size: number; type: string }) => {
        addFile(file);
      });
    }
  }, [addFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

  const generateUniqueFileName = (baseName: string): string => {
    const trimmedBaseName = baseName.length > 15 ? baseName.substring(0, 15) : baseName;
    let uniqueName = `${trimmedBaseName}_${Math.floor(Math.random() * 100000)}`;
    let attempts = 0;

    while (uploadedFiles.some(file => file.name === uniqueName) && attempts < 100) {
      uniqueName = `${trimmedBaseName}_${Math.floor(Math.random() * 100000)}`;
      attempts++;
    }

    return uniqueName;
  };

  const handleFileUpload = (file: File) => {
    // const newFileName = generateUniqueFileName(file.name);
    setAddedFile(file);
  };

  const handleEvaluateScore = () => {
    if (courseworkType === 'Coursework Type' || subject === 'Subject' || title.trim() === '') {
      setError('Please fill out all required fields.');
      return;
    }

    if (!addedFile) {
      setError('Please upload a file.');
      return;
    }
    setError(null);
    setUploading(true);
    const newFileName = generateUniqueFileName(addedFile.name);
    const newFile = { name: newFileName, size: addedFile.size, type: 'application/pdf' };

    let progress = 0;
    const uploadInterval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setUploadProgress(progress);
      } else {
        clearInterval(uploadInterval);
        setUploadProgress(0);
        setUploadStatus('Uploaded');
        
        addFile(newFile);

        const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        
        if (!existingFiles.some(existingFile => existingFile.name === newFile.name)) {
          localStorage.setItem('uploadedFiles', JSON.stringify([...existingFiles, newFile]));
        }

        setUploading(false);
        setAddedFile(null); // Reset file name after uploading
        setTimeout(() => {
          setUploadStatus(null);
        }, 2000);
      }
    }, 100);
  };

  return (
    <div className="bg-[#f5f7fa] p-6 rounded-3xl shadow-md mb-14 mt-14">
       <div
        className="border-dashed border-2 bg-white border-[#cec4eb] p-6 text-center cursor-pointer rounded-xl"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <FontAwesomeIcon icon={faFileUpload} className="h-10 w-10 mx-auto text-gray-400 mt-12" />
        <p className="text-gray-500 text-2xl">{addedFile?.name ? addedFile?.name : 'Drag and drop a PDF or click to upload'}</p>
        <p className="text-gray-500 text-base">*Limit 25 MB per file</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <button
          className="my-12 px-8 py-2 bg-white text-[#6947bf] font-bold text-lg rounded-3xl border-2 border-[#cec4eb]"
          onClick={() => fileInputRef.current?.click()}
        >
          {addedFile?.name ? 'Change File' : 'Upload your file'}
        </button>
      </div>

    <div className="mt-4">
        <p className="text-gray-500 text-xl mt-4 mb-2">Select your course & subjects*</p>
         <select
          className={`border rounded-2xl p-2 px-5 mr-4 text-[#5b6170] font-medium ${
            courseworkType === 'Coursework Type' && error !== null ? 'border-red-500' : ''
          }`}
          value={courseworkType}
          onChange={(e) => {
            setCourseworkType(e.target.value);
            setError(null); // Clear error on change
          }}
        >
          <option value="Coursework Type">Coursework Type</option>
          <option value="IA Example">IA Example</option>
          <option value="EE Example">EE Example</option>
          <option value="IO Example">IO Example</option>
          <option value="Tok Example">Tok Example</option>
        </select>
        <select
          className={`border rounded-2xl p-2 px-5 mx-4 text-[#5b6170] font-medium ${
            subject === 'Subject' && error !== null ? 'border-red-500' : ''
          }`}
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setError(null);
          }}
        >
          <option value="Subject">Subject</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
        </select>
      </div>
      
      <div>
        <p className="text-gray-500 text-xl mt-4">Enter your essay title*(Required)</p>
         <input
          type="text"
          placeholder="how nation works..."
          className={`border rounded-2xl p-2 mt-4 w-2/5 text-[#5b6170] font-medium focus:outline-none ${
            title.trim() === '' && error !== null ? 'border-red-500' : ''
          }`}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
        />
      </div>
      <button className="mt-4 px-4 py-2 bg-[#adb8c9] text-white rounded-3xl" onClick={handleEvaluateScore}>Evaluate Your Score</button>

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
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
