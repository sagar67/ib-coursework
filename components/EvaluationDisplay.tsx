'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import 'tailwindcss/tailwind.css';
import { useRouter } from "next/router";
import { dummyData } from "./common/dummydata";
import ExploreCoursework from "./ExploreCoursework";

const CircularProgressBar = ({ percentage, radius }) => {
  console.log('percentage',percentage);
  const strokeColor = percentage >=70 ? '#3cc28a' : percentage >=40 ? '#f9c94e' : '#eb751f';
  const circleRadius = radius ? radius : 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (percentage / 100) * circleCircumference;

  return (
    <svg width={120} height={120} className="rotate-[-90deg]">
      <circle
        cx="60"
        cy="60"
        r={circleRadius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="8"
      />
      <circle
        cx="60"
        cy="60"
        r={circleRadius}
        fill="none"
        stroke={strokeColor}
        strokeWidth="8"
        strokeDasharray={circleCircumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};

const Criterion = ({ criterion, score }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
   <div className="bg-white px-4 rounded-2xl shadow mb-4">
  <div className="flex items-center justify-between"> 
    <div className="flex items-center flex-grow">
      <div className="relative">
        <CircularProgressBar percentage={(score / 10) * 100} radius={30} />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
          {score}/10
        </div>
      </div>

      <div className="flex flex-col">
        <h4 className="font-semibold text-[#98a1bb]">Criterion {criterion}:</h4>
        <p className="font-medium">
          Understanding Knowledge <br /> Questions
        </p>
      </div>
    </div>

    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-gray-500 px-2 flex-shrink-0"
    >
      <FontAwesomeIcon
        icon={isOpen ? faChevronUp : faChevronDown}
        className="text-gray-500 cursor-pointer"
      />
    </button>
  </div>

  {isOpen && (
    <div className="mt-4 text-gray-600">
      <ExploreCoursework/>
    </div>
  )}
</div>

  );
};

export default function EvaluationDisplay() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); 
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [pdfData, setPdfData] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.query.courseData) {
      const parsedData = JSON.parse(router.query.courseData);
      setPdfData(parsedData);
    }
  }, [router.query.courseData]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 2)); // Max zoom 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.5)); // Min zoom 50%
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const criteriaData = [
    { criterion: 'A', score: 7, details: 'Details about criterion A...' },
    { criterion: 'B', score: 5, details: 'Details about criterion B...' },
    { criterion: 'C', score: 3, details: 'Details about criterion C...' },
  ];

  return (
    <div className="bg-[#e5ecf3] min-h-screen p-8 flex">
      <main className={`flex-grow p-6 bg-[#e5ecf3]} rounded-lg flex space-x-4`}>
        <section className={`bg-white shadow-lg rounded-2xl ${isFullScreen ? 'w-[100%]' : 'w-[70%]'} flex flex-col overflow-hidden ${isCollapsed ? "h-[6vh]" : "h-[90vh]"} mt-0`}>
          <div className="flex justify-between mb-4 bg-[#f1f5f9] p-8 border-b-2 border-[#c1ccd6]">
            <h2 className="font-bold text-gray-700">{`${pdfData.title}.pdf`}</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleZoomOut}
                className="px-2 py-1 rounded-full text-gray-500"
              >
                <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
              </button>
              <button className="text-[#5b6170] font-semibold">{Math.round(zoomLevel * 100)}%</button>
              <button
                onClick={handleZoomIn}
                className="px-2 py-1 rounded-full text-gray-500"
              >
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              </button>
              <button
                onClick={toggleFullScreen}
                className="px-2 py-1 rounded-full text-gray-500"
              >
                <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
              </button>
              <div onClick={toggleCollapse} className="flex items-center space-x-1 bg-white border rounded-2xl py-1 px-2 cursor-pointer">
                <FontAwesomeIcon
                  icon={isCollapsed ? faChevronDown : faChevronUp}
                  className="text-gray-500 cursor-pointer"
                />
                <p className="text-[#656b79]">Collapse</p>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-500 ${isCollapsed ? "h-0 overflow-hidden" : "flex-grow overflow-auto"}  p-6`}
            style={{
              maxHeight: "100%",
            }}
          >
            <p
              className="text-sm text-gray-700 leading-relaxed"
              style={{
                fontSize: `${1.0 * zoomLevel}rem`,
                lineHeight: `${1.5 * zoomLevel}rem`,
                overflow: "auto",
              }}
            >
              {dummyData}
            </p>
          </div>
        </section>

        {!isFullScreen && <section className={`p-6 w-[30%] space-y-6`}>
          <div className="flex justify-between items-center bg-white shadow-lg rounded-2xl px-4 py-2 w-full max-w-2xl">
          <div>
            <h2 className="text-lg font-semibold text-[#62646d]">Overall Score</h2>
            <p className="text-xl font-semibold">
              Remark: <span className="text-[#3cc28a]">Good</span>
            </p>
            <p className="text-[#bec4d4] whitespace-nowrap">Evaluated on 12 Jul 2024</p> {/* Added whitespace-nowrap here */}
          </div>
          <div className="relative">
            <CircularProgressBar percentage={65} radius={40} />
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              13/20
            </div>
          </div>
        </div>
          <div className="mt-8 w-full max-w-2xl">
            {criteriaData.map((item, index) => (
              <Criterion
                key={index}
                criterion={item.criterion}
                score={item.score}
              />
            ))}
          </div>

          <div>
            <button className="mt-4 px-6 py-2 bg-white text-[#6947bf] text-lg text-bold rounded-full">
              Check Detailed Evaluation
            </button>
          </div>
        </section>}
      </main>
    </div>
  );
}
