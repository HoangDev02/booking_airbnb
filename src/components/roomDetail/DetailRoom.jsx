import React, { useEffect, useState } from "react";
import { getRoomById } from "../../redux/API/apiRoom";

function DetailRoom({ onClick, id }) {
  const [isData, setIsData] = useState(null);
  useEffect(() => {
    const fetchRoom = async () => {
      const data = await getRoomById(id);
      setIsData(data);
    };
    fetchRoom();
  }, []);
  console.log(isData);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative bg-white w-96 rounded-md shadow-lg p-8">
        <button
          type="button"
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 class="text-xl font-bold mb-2">{isData?.title}</h1>
        <p class="text-red-500 mb-4">${isData?.price}</p>
        <p class="text-gray-700 mb-4">{isData?.desc}</p>
        <div class="grid grid-cols-3 gap-4">
          {isData?.img.map((item, index) => (
            <img
              src={item}
              alt={isData?.title}
              class="rounded-lg  object-cover" 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailRoom;
