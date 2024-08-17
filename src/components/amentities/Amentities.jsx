import React, { useEffect, useState } from "react";
import { getAmenitiesByHotelId } from "../../redux/API/apiAmenities";

function Amenities({ hotelId }) {
  const [amenities, setAmenities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getAmenitiesByHotelId(hotelId)
      .then((data) => setAmenities(data))
      .catch((error) => console.error("There was an error!", error));
  }, [hotelId]);

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 8);

  return (
    <div className="flex flex-col mb-3">
      <div className="flex flex-wrap">
        {displayedAmenities.map((data) => (
          <div key={data.id} className="basis-1/2 flex items-center mb-2">
            <img src={data.icon} alt="icon" className="w-8 h-8 rounded-full" />
            <div className="ml-4">
              <h3 className="text-sm font-semibold">{data.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {amenities.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 py-1 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded"
        >
          {showAll ? "Ẩn bớt" : "Xem tất cả"}
        </button>
      )}
    </div>
  );
}

export default Amenities;
