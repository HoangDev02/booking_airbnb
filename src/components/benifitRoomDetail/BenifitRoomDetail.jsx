import {
  faMapMarkerAlt,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function BenifitRoomDetail() {
  return (
    <>
      <div className="flex justify-start mb-3 mt-3">
        <i className="p-2">
          <FontAwesomeIcon icon={faUmbrellaBeach} />
        </i>
        <div className="block">
          <h3 className="font-bold">Lặn ngụp</h3>
          <p>Đây là một trong số ít chỗ ở có bể bơi tại khu vực này.</p>
        </div>
      </div>
    
      <div className="flex justify-start mb-3">
        <i className="p-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </i>
        <div className="block">
          <h3 className="font-bold">Địa điểm</h3>
          <p>100% khách gần đây đã xếp hạng 5 sao cho vị trí này.</p>
        </div>
      </div>
      <div className="flex justify-start mb-3">
        <i className="p-2">
          <FontAwesomeIcon icon={faUmbrellaBeach} />
        </i>
        <div className="block">
          <h3 className="font-bold">Tự nhận phòng</h3>
          <p>Tự nhận phòng với hộp khóa an toàn.</p>
        </div>
      </div>
    </>
  );
}

export default BenifitRoomDetail;
