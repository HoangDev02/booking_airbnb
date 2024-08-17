import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getCountComment } from "../../redux/API/apiComment";

function ReviewRoomDetail({ rating, hotelId }) {
  const [count, setCount] = useState(0);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            className="text-yellow-500"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    getCountComment(hotelId).then((res) => {
      setCount(res);
    });
  }, [hotelId]);
  return (
    <>
      {rating >= 4.5 ? (
        <div className="flex justify-between border-2 rounded-md p-3 mb-3">
          <div className="w-[10rem] p-3">
            <h3 className="font-bold">Được khách yêu thích</h3>
          </div>
          <div className="w-[13rem]">
            <p className="font-medium text-center font-semibold">
              Khách đánh giá đây là một trong những ngôi nhà được yêu thích nhất
              trên Airbnb
            </p>
          </div>
          <div className="block items-center mb-4 text-center p-3">
            <p className="font-bold ml-2">{rating.toFixed(2)}</p>
            <div className="flex items-center">{renderStars(rating)}</div>
          </div>
          <div className="w-[13rem] p-3">
            <p className="font-bold text-center">
              {count > 0 ? count : "0"} <span className="block">Đánh Giá</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-start p-3 ">
          {/* Phần hiển thị rating */}
          <div className="flex items-center space-x-2">
            
            <div className="flex">{renderStars(rating)}</div>
          </div>

          {/* Phần hiển thị số đánh giá */}
          <div className="flex items-center pl-2">
            <p className="text-lg font-bold text-gray-700">
              {count > 0 ? count : "0"}
            </p>
            <span className="text-lg font-bold text-gray-500 pl-2">đánh giá</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewRoomDetail;
