import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getHotelByUserId } from "../../redux/API/apiHotel";
import { getUsersById } from "../../redux/API/apiAuth";
import InforPlance from "./InforPlance";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

function Place({ data }) {
  const [isData, setIsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Thêm state để theo dõi trạng thái loading

  const handleUserId = async (id) => {
    await getHotelByUserId(data.userId).then((data) => setIsData(data));
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/hotels`
        );
        const data = response.data;
        setIsData(data);
        setIsLoading(false); // Kết thúc loading sau khi dữ liệu được fetch thành công
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid gap-x-8 gap-y-4 grid-cols-4 pt-10">
      {isLoading ? ( 
        <div className="flex justify-center items-center w-full h-full">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : data && data.length > 0 ? (
        data.map((listHotel, index) => (
          <div className="">
              <div className="flex w-[20rem]" key={index}>
            <div className="flex items-center ">
              <div className="w-[20rem] rounded-md ">
                <Slider {...settings}>
                  {listHotel.photos.map((photo, index) => (
                    <img
                      key={index}
                      variant="top"
                      src={`${photo}`}
                      alt=""
                      className="rounded-md w-full h-[20rem] object-cover"
                    />
                  ))}
                </Slider>
                <InforPlance cheapestPrice={listHotel.cheapestPrice} name={listHotel.name} slug={listHotel.slug} userId={listHotel.userId}/>
              </div>
            </div>
          </div>
          </div>
          
        ))
      ) : (
        null
      )}
    </div>
  );
  
}

export default Place;
