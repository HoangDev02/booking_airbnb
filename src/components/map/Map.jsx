import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../redux/API/apiHotel";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-search";
import "leaflet-search/dist/leaflet-search.src.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ data,close }) => {
  console.log("data",data);
  const defaultPosition = [16.0313489, 108.2099757];
  const dispatch = useDispatch();
  // const listHotel = useSelector((state) => state.hotels.hotels.hotel);

  // Custom Marker icon
  const myIcon = L.icon({
    iconUrl:
      "https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  // Refs for map and search control
  const searchControlRef = useRef(null);
  const mapContainerRef = useRef(null);

  // State variables
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    if (mapContainerRef.current) {
      const searchControl = new L.Control.Search({
        position: "topright",
        propertyName: "name",
        marker: false,
        moveToLocation: function (latlng, title, map) {
          map.setView(latlng, 13);
        },
        searchLabel: "Search location...",
        textErr: "Location not found",
        initial: false,
        collapsed: true,
        textPlaceholder: "Enter location here...",
        className: "custom-search",
      });

      searchControlRef.current = searchControl;
      mapContainerRef.current.addControl(searchControl);
    }

    getAllHotels(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      const hotelMarkers = data.map((hotel) => ({
        latlng: [hotel.lat, hotel.long],
        address: hotel.address,
        name: hotel.name,
        photos: hotel.photos,
      }));
      setMarkers(hotelMarkers);
    }
  }, [data]);

  return (
    <div className="">
      <div className="absolute top-0 bottom-10 left-0 right-0 mt-[20rem] h-[70rem]">
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
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${location.photos[0]}`}
                      alt="marker"
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="mt-2 text-gray-500">No Image Available</div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="fixed  bottom-0 left-0 right-0 flex justify-center mb-4 z-999">
          <button
            className="bg-black text-white rounded-2xl h-[2.5rem] w-[10rem]"
            onClick={close}
          >
            Hiển thị danh sách
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
