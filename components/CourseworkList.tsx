// pages/index.tsx

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';
import useUploadStore from '@/store/uploadStore';
import { useRouter } from 'next/router';
import { dummyData } from './common/dummydata';

const tabs = ["All", "IA Example", "EE Example", "IO Example", "Tok Example"];

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const uploadedFiles = useUploadStore((state) => state.uploadedFiles);
  const [data,setData] = useState([]);

  useEffect(()=>{
    const uploadedData = uploadedFiles.map((item)=>{
      return {
      title: item?.title,
      subject: item?.subject,
      readingTime: "18 min read",
      words: "3288 words",
      rating: "7/7",
      language: "English",
      courseworkType: item?.courseworkType,
  }
    })
    setData(uploadedData);
  },[uploadedFiles])
  
  return (
    <div className=" p-8">
      <section>
        <h2 className="text-xl font-bold text-[#5b6170] mb-4">My coursework</h2>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <CourseworkCard key={index} coursework={item} />
          ))}
        </div>
        <a href="#" className="text-[#98a1bb] text-lg font-semibold flex justify-center align-center">View all</a>
      </section>

      <section className="mt-12">
  <h2 className="text-xl font-bold text-gray-700 mb-4">Explore coursework</h2>
  <div className="flex space-x-4 mb-6">
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`px-4 py-2 rounded-xl font-semibold ${
          activeTab === tab
            ? 'bg-white text-[#6947bf]'
            : 'text-[#98a1bb]'
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          .filter((item) => item?.courseworkType === activeTab || activeTab === "All") 
          .map((item, index) => (
            <CourseworkCard key={index} coursework={item} />
          ))}
      </div>

  <div className="flex justify-center mt-8 space-x-2 text-gray-700">
    <button className="px-4 py-2 rounded-full border border-gray-400">1</button>
    <button className="px-4 py-2 rounded-full border border-gray-400">2</button>
  </div>
</section>

    </div>
  );
}

const CourseworkCard = ({ coursework }) => {
const router = useRouter();
const handleViewClick = () => {
  
   router.push({
      pathname: "/coursework-viewer",
      query: { courseData: JSON.stringify(coursework) },
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex w-full max-w-[350px] cursor-pointer" onClick={handleViewClick}>
  <div className="w-[30%] border border-gray-300 p-2 rounded-md overflow-hidden">
    <p style={{ fontSize: 4 }}>
      {dummyData.split(" ").slice(0, 100).join(" ")}
    </p>
  </div>
  <div className="w-[70%] flex flex-col justify-between ml-4">
    <h3 className="font-semibold text-gray-800">{coursework.title}</h3>
    <p className='text-sm text-[#7a8196] h-12 overflow-hidden'>
      How does the temperature of a Copper pipe affect the time it takes a magnet t..
    </p>
    <div className="space-x-1 text-xs text-[#5b6170] font-semibold">
      <span>{coursework.subject}</span>
      <span>{coursework.readingTime}</span>
      <span>{coursework.words}</span>
    </div>
    <div className="flex justify-between items-center text-sm text-[#5b6170] font-semibold">
      <div className="flex items-center space-x-1">
        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        <span>{coursework.rating}</span>
      </div>
      <span>{coursework.language}</span>
    </div>
  </div>
</div>


  );
};
