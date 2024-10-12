'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFileAlt, faFileUpload, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import useUploadStore from '../store/uploadStore';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  useEffect(() => {
    const files = localStorage.getItem('uploadedFiles');
    if (files) {
      const parsedFiles = JSON.parse(files);
      parsedFiles.forEach((file: { name: string; size: number; type: string , title: string, courseworkType: string, subject: string }) => {
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
     const fileSizeLimit = 25 * 1024 * 1024; // 25 MB

    if (file.size > fileSizeLimit) {
      setError('File size exceeds the 25 MB limit.');
      return;
    }
    setAddedFile(file);
    setError(null)
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
    const newFile = { name: newFileName, size: addedFile.size, type: 'application/pdf' , title: title, courseworkType: courseworkType, subject: subject};
    const coursework = {
          title: title,
          subject: subject,
          readingTime: "18 min read",
          words: "3288 words",
          rating: "7/7",
          language: "English",
          courseworkType:courseworkType,
      }
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
        setAddedFile(null);
        setTimeout(() => {
           router.push({
            pathname: "/coursework-viewer",
            query: { courseData: JSON.stringify(coursework) },
          });
          setUploadStatus(null);
        }, 2000);
      }
    }, 100);

  };
  console.log('addFile',addFile)
  return (
    <div className="bg-[#f5f7fa] p-6 rounded-3xl shadow-md mb-14 mt-14">
      <div
        className="border-dashed border-2 bg-white border-[#cec4eb] p-6 text-center cursor-pointer rounded-xl"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
  {addedFile == null ? (
    <div>
      <FontAwesomeIcon icon={faFileUpload} className="h-10 w-10 mx-auto text-gray-400 mt-12" />
      <p className="text-gray-500 text-2xl">{addedFile?.name ? addedFile?.name : 'Drag and drop a PDF'}</p>
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
  ) : (
    <div className="flex items-center justify-center border border-gray-300 rounded-2xl p-2 w-72 bg-gray-50 mx-auto my-20">
      <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded mr-4">
        <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4 mx-auto text-gray-400 p-4" />
      </div>
      <div className="flex-grow flex items-center overflow-hidden"> {/* Allow overflow */}
        <FontAwesomeIcon icon={faCheck} className="text-green-600 mr-2" />
        <span className="text-ellipsis whitespace-nowrap overflow-hidden"> {/* Prevent overflow */}
          {addedFile?.name}
        </span>
      </div>
      <div
  className="cursor-pointer text-gray-600 text-xl relative bottom-7 left-3 flex items-center justify-center w-8 h-6 bg-white border-[#c1ccd6] border-2 rounded-full" 
  onClick={() => {
    setAddedFile(null);
  }}
>
  <FontAwesomeIcon icon={faTimes} className="h-4 w-4" /> {/* Ensure the icon fits within the circle */}
</div>

</div>

  )}
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
            setError(null);
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
        <div className={`mt-4 px-4 py-2 ${subject !== 'Subject' && courseworkType !== 'Coursework Type' && title.trim() !== '' ? 'bg-[#6947bf]' : 'bg-[#98a1bb]'} text-white rounded-3xl w-auto sm:w-auto inline-flex justify-center items-center space-x-2`}>
          <FontAwesomeIcon
            icon={faStar}
            className={`h-4 w-4 ${subject !== 'Subject' && courseworkType !== 'Coursework Type' && title.trim() !== '' ? 'text-[#6947bf]' : 'text-[#98a1bb]'} bg-[#eaf0f2] rounded-full p-2`}
          />
          <button
            className={`px-4 py-2 text-white text-base sm:text-xl rounded-3xl`}
            onClick={handleEvaluateScore}
          >
            Evaluate your Score
          </button>
        </div>

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
