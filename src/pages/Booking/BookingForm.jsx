import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./bookingForm.css";
import { useSelector } from "react-redux";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { TfiClose } from "react-icons/tfi";
import {
  getHotelById,
  getHotelByIdAndActive,
} from "../../redux/API/apiBooking";
import Vnpay from "../vnpay/Vnpay";
import { unavailableDatesRoom } from "../../redux/API/apiRoom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookingForm = ({ data, onClick }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [openDate, setOpenDate] = useState(false);
  const [number, setNumber] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isRoom, isSetIsRoom] = useState([]);
  const [isDataHotel, setIsDataHotel] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [vnpay, setVnpay] = useState("");
  const [unavailableDates, setUnavailableDates] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [dates, setDates] = useState([
    {
      startDate: new Date(queryParams.get("checkin") || data.checkin),
      endDate: new Date(queryParams.get("checkout") || data.checkout),
      key: "selection",
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(true);

  const [vailableDates, setVailableDates] = useState();
  const [openOptions, setOpenOptions] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const navigate = useNavigate();
  const [options, setOptions] = useState({
    adult: data.numberOfAdults,
    children: data.numberOfChildren,
    room: data.numberOfGuests,
  });

  const [bookingData, setBookingData] = useState({
    userId: user?.userId,
    name: "",
    phone: 0,
    roomId: null,
    rooms: [
      {
        quantity: 1,
        total: 0,
        price: 0,
        number: 0,
        unavailableDates: [],
      },
    ],
    active: true, // Added to match Postman data
  });

  const handleToggleCheckoutDatepicker = () => {
    setOpenDate(!openDate);
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeOption = (option) => {
    setNumber(option);
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const getNumberOfDays = (startDate, endDate) => {
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  };
  const fetchRoomByHotel = async () => {
    try {
      const responseRoom = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/rooms/hotel/${data.hotelId}`
      );
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/room-number/room/${responseRoom.data[0].id}`
      );
      isSetIsRoom(response.data);
      //tách dữ liệu ngày bắt đầu và ngày kết thúc để tính giá tiền
      const numberOfDays = getNumberOfDays(
        dates[0].startDate,
        dates[0].endDate
      );
      //tính giá tiền
      const totalPrice = numberOfDays * response.data[0].room.price;
      //set giá tiền vào bookingData
      setBookingData((prevBookingData) => ({
        ...prevBookingData,
        //láy giá tiền vào room và set vào bookingData
        roomId: parseInt(response.data[0].roomId, 10),
        rooms: prevBookingData.rooms.map((room) => ({
          ...room,
          price: totalPrice,
        })),
      }));
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  };

  useEffect(() => {
    const unavailableDates = dates
      .map((dateRange) => {
        const startDate = new Date(dateRange.startDate).toISOString();
        const endDate = new Date(dateRange.endDate).toISOString();
        return [startDate, endDate];
      })
      .flat();

    setVailableDates(unavailableDates);

    //khi thay đổi ngày tháng thuê phòng thì sẽ thay đổi query bằng checkin và checkout
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("checkin", format(dates[0].startDate, "yyyy-MM-dd"));
    newSearchParams.set("checkout", format(dates[0].endDate, "yyyy-MM-dd"));
    const queryString = newSearchParams.toString();

    newSearchParams.delete("checkin");
    newSearchParams.delete("checkout");

    const finalQueryString = `${queryString}`;
    navigate(`${location.pathname}?${finalQueryString}`);
  }, [dates, navigate, location.pathname]);

  const handleUnavailableDates = async (id, number) => {
    try {
      const datesResponse = await unavailableDatesRoom(id, number);
      setUnavailableDates(datesResponse.unavailableDates);
    } catch (error) {
      console.error("Error fetching unavailable dates:", error);
    }
  };
  useEffect(() => {
    setBookingData((prevBookingData) => ({
      ...prevBookingData,
      rooms: prevBookingData.rooms.map((room) => ({
        ...room,
        number: number,
        unavailableDates: vailableDates,
      })),
    }));
    const fetchHotelByUserId = async () => {
      const reponse = await getHotelById(data.hotelId);
      setIsDataHotel(reponse);
    };
    fetchHotelByUserId();
  }, [vailableDates, number]);
  useEffect(() => {
    fetchRoomByHotel();
  }, [dates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = [
      { condition: !bookingData.roomId, message: "Vui lòng chọn phòng." },
      { condition: !bookingData.name, message: "Vui lòng nhập tên." },
      {
        condition: !bookingData.phone,
        message: "Vui lòng nhập số điện thoại.",
      },
      {
        condition: !bookingData.rooms[0].number,
        message: "Vui lòng nhập số phòng.",
      },
      {
        condition: !dates[0].startDate,
        message: "Vui lòng chọn ngày bắt đầu.",
      },
      { condition: !dates[0].endDate, message: "Vui lòng chọn ngày kết thúc." },
      { condition: !options.adult, message: "Vui lòng nhập số người lớn." },
      { condition: !options.children, message: "Vui lòng nhập số trẻ em." },
      { condition: !options.room, message: "Vui lòng chọn lại số phòng." },
      { condition: !options.total, message: "Vui lòng chọn lại ngày để số tiền hơn 5$" },
    ];

    for (let validation of validations) {
      if (validation.condition) {
        toast.error(validation.message);
        return;
      }
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/booking/create-booking`,
        bookingData
      );
      if (response.status === 201) {
        toast.success("Đặt phòng thành công");
      } else {
        toast.error("Đặt phòng thất bại");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  const [disabledDatesByRoom, setDisabledDatesByRoom] = useState({});

  //check date, if date exios then set disable date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomId = await getHotelById(data.hotelId);
        const bookingData = await getHotelByIdAndActive(roomId.id);
        // Extract unavailable dates for each room
        const roomDisabledDates = {};
        bookingData.forEach((booking) => {
          booking.bookingRoom.forEach((room) => {
            const roomNumberKey = room.number;
            if (!roomDisabledDates[roomNumberKey]) {
              roomDisabledDates[roomNumberKey] = [];
            }
            room.unavailableDates.forEach((date, index) => {
              const startDate = new Date(date);
              const endDate = new Date(room.unavailableDates[index + 1]);
              if (!isNaN(endDate)) {
                for (
                  let d = new Date(startDate);
                  d <= endDate;
                  d.setDate(d.getDate() + 1)
                ) {
                  roomDisabledDates[roomNumberKey].push(new Date(d));
                }
              } else {
                roomDisabledDates[roomNumberKey].push(startDate);
              }
            });
          });
        });

        setDisabledDatesByRoom(roomDisabledDates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log("isRoom",isRoom[0].number);
  const roomNumber = bookingData.rooms[0].number;
  return (
    <>
      <div className="mb-3">
        <label htmlFor="paymentMethod" className="form-label">
          Thanh toán:
        </label>
        <select
          className="form-select"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value);
            setVnpay(e.target.value);
          }}
        >
          <option value="">chọn phương thức thanh toán</option>
          <option value="cash">Tiền mặt</option>
          <option value="card">Ngân Hàng</option>
        </select>
      </div>
      <div className={` ${isFormVisible ? "block" : "hidden"}`}>
        <div
          onClick={onClick}
          className="absolute top-0 right-0 m-4 cursor-pointer"
        >
          <TfiClose />
        </div>
        <div className="container mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-center mb-8">
              Yêu cầu đặt phòng/đặt chỗ
            </h1>
            {bookingSuccess && (
              <p className="text-green-500 mb-4 text-center">
                Booking successful!
              </p>
            )}
            <div></div>
            {isFormVisible && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                {Array.isArray(isRoom) &&
                  isRoom?.map((room, index) => (
                    <div key={room.id} className="mb-4">
                      <div className="flex ">
                        <input
                          type="radio"
                          id={`option${index}`}
                          name="option"
                          onChange={() => {
                            handleChangeOption(room.number);
                            handleUnavailableDates(room.roomId, room.number);
                          }}
                          className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          defaultChecked={index === 0} // Set the first radio button as checked by default
                        />
                        <label
                          htmlFor={`option${index}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          {`Phòng ${room.number}`}
                        </label>
                      </div>
                    </div>
                  ))}
                <div className="block items-center mb-2">
                  <label>Ngày: </label>
                  <span onClick={() => setOpenDate(!openDate)}>{`${format(
                    dates[0].startDate,
                    "MM/dd/yyyy"
                  )} - ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                  {openDate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  z-50">
                      <div className="relative">
                        <div className="absolute bg-white shadow rounded p-4 top-[-5rem]">
                          <DateRange
                            onClick={(e) => e.stopPropagation()}
                            editableDateInputs={true}
                            onChange={(item) => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            minDate={new Date()}
                            className="text-white"
                            ranges={dates}
                            disabledDates={
                              disabledDatesByRoom[roomNumber] || []
                            } // Disable the unavailable dates for the specific room
                          />
                          <button
                            onClick={() => handleToggleCheckoutDatepicker()}
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
                {vnpay === "cash" ? (
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Đặt phòng
                  </button>
                ) : vnpay === "card" ? (
                  <Vnpay data={bookingData} paymentMethod={paymentMethod} />
                ) : (
                  <></>
                )}
              </form>
            )}
          </div>
        </div>

        {/* xử lý giá tiền */}
        <div className="border border-slate-500 rounded-md w-[27rem]  fixed left-[50%] top-[15%] p-4">
          {
            // isDataHotel.map(item => (
            <div className="flex ">
              <img
                src={`${(isDataHotel?.photos && isDataHotel.photos[0]) || ""}`}
                alt="hinh"
                className=" rounded-md cover-full w-[5rem] h-[5rem]"
              ></img>
              <div className="block p-2">
                <h3 className="font-bold ">{isDataHotel?.name}</h3>
                <p>{isDataHotel.desc}</p>
              </div>
            </div>
            // ))
          }
          <div>
            <hr className="border-t border-gray-400 pt-3" />
            <h3 className="font-bold">Chi tiết giá</h3>
            <div className="flex justify-between b p-1 bg-white mt-2">
              <p className="text-sm text-gray-700">Phí vệ sinh</p>
              <p className="text-sm text-gray-700">$7</p>
            </div>
            <div className="flex justify-between b p-1 bg-white mt-2">
              <p className="text-sm text-gray-700">Phí dịch vụ</p>
              <p className="text-sm text-gray-700">$5</p>
            </div>
          </div>
          <hr className="border-t border-gray-400 mt-2" />
          <div className="flex justify-between b p-1 bg-white">
            <h3 className="text-xl text-gray-700 font-bold">Tổng(USD)</h3>
            <p className="text-sm text-gray-700">
              {bookingData.rooms[0].price}
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default BookingForm;
