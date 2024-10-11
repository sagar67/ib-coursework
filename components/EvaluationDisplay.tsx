'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faChevronUp, faChevronDown, faPlus, faMinus, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";
import 'tailwindcss/tailwind.css';
import { useRouter } from "next/router";
import { dummyData } from "./common/dummydata";

// Dummy Data for Evaluation
const evaluationData = [
  { title: "Understanding Knowledge Questions", score: "4/5" },
  { title: "Analysis", score: "3/5" },
  { title: "Conclusion", score: "5/5" },
];

// Main Component
export default function EvaluationDisplay() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom state
  const [isFullScreen, setIsFullScreen] = useState(false); // Fullscreen state
  const [pdfData, setPdfData] = useState({});
  const router = useRouter();
  const { courseData } = router.query;

  useEffect(() => {
    if (router.query.courseData) {
      const parsedData = JSON.parse(router.query.courseData);
      setPdfData(parsedData);
    }
  }, [router.query.courseData]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to increase zoom
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 2)); // Max zoom 200%
  };

  // Function to decrease zoom
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.5)); // Min zoom 50%
  };

  // Function to toggle full screen
  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Request full screen
      document.documentElement.requestFullscreen();
    } else {
      // Exit full screen
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="bg-[#e5ecf3] min-h-screen p-8 flex">
      {/* Main Content */}
      <main className="flex-grow p-6 bg-[#e5ecf3]} rounded-lg flex space-x-4">
        {/* PDF Viewer Section */}
        <section className={`bg-white shadow-lg rounded-2xl flex-grow flex flex-col overflow-hidden ${isCollapsed ? "h-[6vh]" : "h-[90vh]"}`}>
          <div className="flex justify-between mb-4 bg-[#f1f5f9] p-6">
            <h2 className="font-bold text-gray-700">{`${pdfData.title}.pdf`}</h2>
            <div className="flex items-center space-x-4">
              {/* Zoom Buttons */}
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
              {/* Full Screen Button */}
              <button
                onClick={toggleFullScreen}
                className="px-2 py-1 rounded-full text-gray-500"
              >
                <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
              </button>
              {/* Collapse Button */}
              <div onClick={toggleCollapse} className="flex items-center space-x-1 bg-white border rounded-2xl py-1 px-2 cursor-pointer">
                <FontAwesomeIcon
                  icon={isCollapsed ? faChevronDown : faChevronUp}
                  className="text-gray-500 cursor-pointer"
                />
                <p className="text-[#656b79]">Collapse</p>
              </div>
            </div>
          </div>

          {/* PDF Content */}
          <div
            className={`transition-all duration-500 ${isCollapsed ? "h-0 overflow-hidden" : "flex-grow overflow-auto"}  p-6`}
            style={{
              maxHeight: "100%", // Ensure it does not exceed the viewport height
            }}
          >
            <p
              className="text-sm text-gray-700 leading-relaxed"
              style={{
                // Set font size based on zoom level
                fontSize: `${1.0 * zoomLevel}rem`, // Adjust font size directly based on zoom
                lineHeight: `${1.5 * zoomLevel}rem`, // Maintain spacing with zoom
                overflow: "auto",  // Add scroll for zoomed content
              }}
            >
              {dummyData}
            </p>
          </div>
        </section>

        {/* Evaluation Section */}
        <section className="bg-white shadow-lg rounded-lg p-6 w-96 space-y-6">
          {/* Circular Score Section */}
          <div className="flex justify-center">
            <div className="relative">
              <CircularProgressBar percentage={72} />
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-500">
                13/20
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-800">
              Remark: <span className="text-green-500">Good</span>
            </h3>
          </div>

          {/* Evaluation Details */}
          <div className="space-y-4">
            {evaluationData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">{item.title}</span>
                <span className="text-gray-500">{item.score}</span>
              </div>
            ))}
          </div>

          {/* Evaluation Button */}
          <div className="flex justify-center">
            <button className="mt-4 px-6 py-2 bg-purple-500 text-white text-sm rounded-full">
              Check Detailed Evaluation
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Circular Progress Bar Component
const CircularProgressBar = ({ percentage }) => {
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference - (percentage / 100) * circleCircumference;

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
        stroke="#34D399"
        strokeWidth="8"
        strokeDasharray={circleCircumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </svg>
  );
};
