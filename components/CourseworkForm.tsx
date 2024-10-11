import React, { useState } from 'react';
import useCourseworkStore from '../store/courseworkStore';

interface CourseworkFormProps {
  onSubmit: (data: { title: string; type: string; subject: string }) => void;
}

const CourseworkForm: React.FC<CourseworkFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, type, subject });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Essay Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 border rounded"
      />
      <select value={type} onChange={(e) => setType(e.target.value)} required className="p-2 border rounded">
        <option value="">Select Coursework Type</option>
        <option value="Essay">Essay</option>
        <option value="Research">Research</option>
      </select>
      <select value={subject} onChange={(e) => setSubject(e.target.value)} required className="p-2 border rounded">
        <option value="">Select Subject</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Submit Coursework
      </button>
    </form>
  );
};

export default CourseworkForm;
