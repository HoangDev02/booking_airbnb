import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format, differenceInDays } from "date-fns"; // Import differenceInDays function

import { Link } from "react-router-dom";

function FormBookingRoomDetail({ data }) {
  console.log("data" , data);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  
  const calculateTotalPrice = () => {
    const { startDate, endDate } = dates[0];
    const numDays = differenceInDays(endDate, startDate); // Calculate number of days
    return data.cheapestPrice * numDays; // Multiply price per night by number of days
  };
  const handleShowBookingForm = () => {
    setShowBookingForm(!showBookingForm);
  };
  return (
    <div className="">
      <div className=" bg-white border border-blue-100 shadow rounded-md ml-[20rem] p-2 sticky top-[7rem] ">
        <h2 className="font-bold mb-3">
          ${data.cheapestPrice}/ <span>đêm</span>
        </h2>
        <div className="">
          <div className="block items-center mb-2">
            <button
              onClick={() => setOpenDate(!openDate)}
              className="bg-white border border-b-blue-100 rounded-tl-md h-[3rem] w-[50%]"
            >
              <span className="block">Nhận phòng</span>
              {`${format(dates[0].startDate, "MM/dd/yyyy")}`}{" "}
            </button>
            <button
              onClick={() => setOpenDate(!openDate)}
              className="bg-white border border-b-blue-100 rounded-tr-md h-[3rem] w-[50%]"
            >
              <span className="block">Trả phòng</span>
              {`${format(dates[0].endDate, "MM/dd/yyyy")}`}{" "}
            </button>
            {openDate && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  z-50">
                <div className="relative">
                  <div className="absolute bg-white shadow rounded p-4 top-[-5rem]">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      minDate={new Date()}
                      className="text-white"
                    />
                    <button
                      onClick={() => setOpenDate(false)}
                      className="absolute bottom-0 right-0 mb-4 mr-4 bg-black rounded-xl text-white px-4 py-2 hover:bg-gray-700"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center ">
              <button
                onClick={() => setOpenOptions(!openOptions)}
                className="bg-white border border-b-blue-100 rounded-b-md h-[3rem] w-[100%]"
              >
                <span className="block">Khách</span>{" "}
                {`${options.adult} adult · ${options.children} children · ${options.room} room`}
              </button>
              {openOptions && (
                <div className="absolute bg-white shadow rounded p-4 mt-[15rem]">
                  <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.adult <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.adult}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.children <= 0}
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.children}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={options.room <= 1}
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="optionCounterNumber">
                        {options.room}
                      </span>
                      <button
                        className="optionCounterButton"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
         
        <button
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-red-700 w-[100%]"
        > 
        <Link
          to={`/booking?hotelId=${data.id}&checkin=${format(
            dates[0].startDate,
            "yyyy-MM-dd"
          )}&checkout=${format(
            dates[0].endDate,
            "yyyy-MM-dd"
          )}&numberOfGuests=${
            options.adult + options.children
          }&numberOfAdults=${options.adult}&numberOfChildren=${
            options.children
          }&leave=${data.userId}`}
          className="text-sm text-gray-500"
        >
          Booking now
        </Link>
        </button>
        <div className="flex justify-between b p-1 bg-white">
          <p className="text-sm text-gray-700">
            {differenceInDays(dates[0].endDate, dates[0].startDate)} đêm,{" "}
            {options.adult + options.children} người
          </p>
          <p className="text-sm text-gray-700">${calculateTotalPrice()}</p>
        </div>
        <div className="flex justify-between b p-1 bg-white">
          <p className="text-sm text-gray-700">Phí vệ sinh</p>
          <p className="text-sm text-gray-700">$7</p>
        </div>
        <div className="flex justify-between b p-1 bg-white">
          <p className="text-sm text-gray-700">Phí dịch vụ</p>
          <p className="text-sm text-gray-700">$5</p>
        </div>
        {/* {showBookingForm && <BookingForm data={data} onClick={handleShowBookingForm}/>} */}
      </div>
    </div>
  );
}

export default FormBookingRoomDetail;
