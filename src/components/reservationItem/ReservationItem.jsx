import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineUserSwitch,
  AiOutlineWechat,
} from "react-icons/ai";
import { accessBooking, getbookingLeaveById } from "../../redux/API/apiBooking";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReservationItem({ user }) {
  const [dataLeave, setDataLeave] = useState([]);

  useEffect(() => {

    //gọi api để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await getbookingLeaveById(user?.access_token);
        setDataLeave(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user.id ]);

  //xử lý chấp nhận đặt phòng
  const handleAccessBooking = async (bookingId) => {
    try {
      const data = {
        active: true,
      };
      await accessBooking(bookingId, data);
      toast.success("Chấp nhận thành công");
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
      <div className="flex justify-center items-center h-auto w-full mt-5 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {dataLeave?.length > 0 ? (
            dataLeave?.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg p-6 mb-6 rounded-lg transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Tên: {item.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  Số điện thoại: {item.phone}
                </p>
                {item?.active === true ? (
                  <p className="text-green-600 font-semibold mb-2">
                    Trạng thái: Đã chấp nhận
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold mb-2">
                    Trạng thái: {item.active ? "Chấp nhận" : "Không chấp nhận"}
                  </p>
                )}
                <p className="text-gray-500 mb-4">
                  Thời gian đặt phòng:{" "}
                  {new Date(item.modifiedOn).toLocaleString()}
                </p>
                <div className="space-y-8">
                  {item?.bookingRoom?.map((room) => (
                    <div
                      key={room.id}
                      className=" p-6 rounded-xl shadow-2xl border border-blue-300 hover:shadow-2xl transition duration-300 transform hover:scale-105"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <p className="text-xl font-extrabold text-blue-900">
                          Số phòng: {room.number}
                        </p>
                        <p className="text-xl text-green-700 font-extrabold">
                          {room.price.toLocaleString()} VND
                        </p>
                      </div>
                      <div className=" p-6 rounded-xl shadow-2xl border border-purple-300 hover:shadow-3xl transition duration-300 transform hover:scale-105">
                        <p className="text-gray-600 text-lg">
                          <span className="font-semibold text-blue-800">
                            Ngày Đặt / Ngày Trả:
                          </span>{" "}
                          {room.unavailableDates
                            .map((dateString) => {
                              const dateOnly = new Date(
                                dateString
                              ).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              });
                              return dateOnly;
                            })
                            .join(" -- ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {item?.active === false && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded w-full transition duration-200"
                    onClick={() => handleAccessBooking(item.id)}
                  >
                    Chấp nhận
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center col-span-1 md:col-span-2 lg:col-span-3">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-center text-sm font-semibold text-gray-600">
                Bạn không có khách nào trả phòng vào hôm nay hoặc ngày mai.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* start help */}
      <h1 className="font-bold mt-[6rem] text-2xl">
        Chúng tôi luôn sẵn sàng trợ giúp
      </h1>
      <div className="mt-5 flex">
        <div className="flex justify-start border border-black rounded-lg p-3">
          <AiOutlineUserSwitch className="text-4xl mb-2 mr-2" />
          <div className="flex flex-col">
            <h3 className="font-bold">
              Tham gia Câu lạc bộ Chủ nhà tại địa phương
            </h3>
            <p>
              Kết nối, cộng tác và chia sẻ với các Chủ nhà khác cũng như thành
              viên khác trong cộng đồng.
            </p>
          </div>
        </div>
        <div className="flex justify-start border border-black rounded-lg p-3 ml-5">
          <AiOutlineWechat className="text-4xl mb-2 mr-2" />
          <div className="flex flex-col">
            <h3 className="font-bold">
              Tham gia Câu lạc bộ Chủ nhà tại địa phương
            </h3>
            <p>
              Kết nối, cộng tác và chia sẻ với các Chủ nhà khác cũng như thành
              viên khác trong cộng đồng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationItem;
