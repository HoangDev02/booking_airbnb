import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters, AiOutlineUserSwitch, AiOutlineWechat } from "react-icons/ai";
import { accessBooking, getbookingLeaveById } from "../../redux/API/apiBooking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReservationItem({ user }) {
  const [dataLeave, setDataLeave] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getbookingLeaveById(user._id);
        setDataLeave(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user._id]);

  const handleAccessBooking = async (bookingId) => {
    const leaveData = dataLeave.find((item) => item._id === bookingId);
    const newData = {
      bookingId: leaveData._id,
      subtotal: leaveData.rooms.reduce((total, room) => total + room.price, 0),
      userId: user._id,
      name: leaveData.name,
      phone: leaveData.phone,
      rooms: leaveData.rooms.map((room) => ({
        roomId: room.roomId,
        roomNumbers: room.roomNumbers.map((roomNumber) => ({
          number: roomNumber.number,
          unavailableDates: roomNumber.unavailableDates.map((dateString) => {
            const dateOnly = dateString.substring(0, 10);
            return dateOnly;
          }),
        })),
      })),
    };
    try {
      await accessBooking(newData);
      toast.success("Chấp nhận thành công");
      setDataLeave((prevData) =>
        prevData.filter((item) => item._id !== bookingId)
      );
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="pt-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Đặt phòng/đặt chỗ của bạn</h1>
        <ToastContainer />
        <Link to="/reservation" className="">
          Tất cả đặt phòng{" "}
        </Link>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex justify-center">
          <div className="border border-black rounded-lg p-1 m-1">
            <h1 className="text-center">Sắp trả phòng</h1>
          </div>
          <div className="border border-black rounded-lg p-1 m-1">
            <h1 className="text-center">Hiện đang đón tiếp</h1>
          </div>
          <div className="border border-black rounded-lg p-1 m-1">
            <h1 className="text-center">Sắp đến</h1>
          </div>
          <div className="border border-black rounded-lg p-1 m-1">
            <h1 className="text-center">Đánh giá đang chờ xử lý (0)</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-[20rem] w-full mt-5 rounded-lg">
        <div className="flex items-center mt-20">
          {dataLeave?.length > 0 ? (
            dataLeave.map((item) => (
              <div key={item._id} className="bg-gray-100 p-4 mb-4 rounded-lg">
                <h2 className="text-lg font-bold mb-2">Tên: {item.name}</h2>
                <p className="mb-2">Số điện thoại: {item.phone}</p>
                <p className="mb-2">Trạng thái: {item.active ? "Yes" : "No"}</p>
                <p className="mb-2">
                  Thời gian đặt phòng:{" "}
                  {new Date(item.modifiedOn).toLocaleString()}
                </p>
                {item.rooms.map((room) => (
                  <div key={room._id} className="bg-gray-200 p-4 mb-4 rounded-lg">
                    <p className="mb-2">Giá tiền: {room.price}</p>
                    {room.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className="bg-gray-300 p-4 rounded-lg">
                        <p className="mb-2">Số phòng: {roomNumber.number}</p>
                        <p className="mb-2">
                          Ngày Đặt/ Ngày trả:{" "}
                          {roomNumber.unavailableDates
                            .map((dateString) => {
                              const dateOnly = dateString.substring(0, 10);
                              return dateOnly;
                            })
                            .join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAccessBooking(item._id)}
                >
                  Chấp nhận
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500 mb-2"></div>
              <p className="text-center text-sm font-sans">
                Bạn không có khách nào trả phòng vào hôm nay hoặc ngày mai.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* start help */}
      <h1 className="font-bold mt-[6rem] text-2xl">Chúng tôi luôn sẵn sàng trợ giúp</h1>
      <div className="mt-5 flex">
        <div className="flex justify-start border border-black rounded-lg p-3">
          <AiOutlineUserSwitch className="text-4xl mb-2 mr-2" />
          <div className="flex flex-col">
            <h3 className="font-bold">Tham gia Câu lạc bộ Chủ nhà tại địa phương</h3>
            <p>
              Kết nối, cộng tác và chia sẻ với các Chủ nhà khác cũng như thành viên khác trong cộng đồng.
            </p>
          </div>
        </div>
        <div className="flex justify-start border border-black rounded-lg p-3 ml-5">
          <AiOutlineWechat className="text-4xl mb-2 mr-2" />
          <div className="flex flex-col">
            <h3 className="font-bold">Tham gia Câu lạc bộ Chủ nhà tại địa phương</h3>
            <p>
              Kết nối, cộng tác và chia sẻ với các Chủ nhà khác cũng như thành viên khác trong cộng đồng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
