import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-search";
import "leaflet-search/dist/leaflet-search.src.css";
import { getAllHotels } from "../../redux/API/apiHotel";
import { useDispatch, useSelector } from "react-redux";
import FormCreateHotel from "../formHotel/FormCreateHotel";

function HotelRentalPage() {
  const defaultPosition = [21.0283334, 105.854041]; // Default map position
  const dispatch = useDispatch();
  const listHotel = useSelector((state) => state.hotels.hotels.hotel);
  
  // Custom Marker icon
  const myIcon = L.icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  // Refs for map and search control
  const searchControlRef = useRef(null);
  const mapContainerRef = useRef(null);

  // State variables
  const [markers, setMarkers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    // if (mapContainerRef.current) {
    //   const searchControl = new L.Control.Search({
    //     position: "topright",
    //     propertyName: "name",
    //     marker: false,
    //     moveToLocation: function (latlng, title, map) {
    //       map.setView(latlng, 13);
    //     },
    //     searchLabel: "Search location...",
    //     textErr: "Location not found",
    //     initial: false,
    //     collapsed: true,
    //     textPlaceholder: "Enter location here...",
    //     className: "custom-search",
    //   });

    //   searchControlRef.current = searchControl;
    //   mapContainerRef.current.addControl(searchControl);
    // }

    getAllHotels(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (listHotel && listHotel.length > 0) {
      const hotelMarkers = listHotel.map((hotel) => ({
        latlng: [hotel.lat, hotel.long],
        address: hotel.address,
        name: hotel.name,
        photos: hotel.photos,
      }));
      setMarkers(hotelMarkers);
    }
  }, [listHotel]);

  const searchLocation = async (query) => {
    setIsSearching(true);
    setSearchQuery(query);
    const apiKey = "62f61d0e4c4444288e448d21fb28c3c8"; // Your OpenCage API key
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedQuery}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLocation(data.results[0].components)
      
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        mapContainerRef.current.setView([lat, lng], 13);
        setMarkers([{ latlng: [lat, lng], address: query }]);
        setSearchSuccess(true);
      } else {
        setSearchSuccess(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchSuccess(false);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex h-screen container">
      {!showForm ? (
        <div className="w-full p-4 relative flex flex-col items-center">
          <div className="w-full h-full rounded-lg shadow-lg border-2 border-gray-300 overflow-hidden">
            <MapContainer
              center={defaultPosition}
              zoom={7}
              style={{ height: "100%", width: "100%" }}
              ref={mapContainerRef}
            >
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
              {markers?.map((location, index) => (
                <Marker key={index} position={location.latlng} icon={myIcon}>
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold">{location.name}</h3>
                      <p>{location.address}</p>
                      {location?.photos?.[0] ? (
                        <div className="mt-2 w-full aspect-w-16 aspect-h-9">
                          <img
                            src={`${location.photos[0]}`}
                            alt="marker"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="mt-2 text-gray-500">
                          No Image Available
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <div
              className={`leaflet-top leaflet-right ${
                isSearching ? "searching" : ""
              }`}
            >
              <div className="leaflet-control leaflet-bar">
                <input
                  type="text"
                  placeholder="Search location..."
                  className="p-2 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const query = e.target.value;
                      if (searchControlRef.current) {
                        searchControlRef.current.searchText(query);
                      }
                      searchLocation(query);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          {searchSuccess && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
            >
              Next
            </button>
          )}
        </div>
      ) : (
        <div className="w-full p-4">
          <FormCreateHotel data={markers[0]} search={searchQuery} location={location} />
        </div>
      )}
    </div>
  );
}

export default HotelRentalPage;
