import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateRoleUser } from "../../redux/API/apiUser";
import { useSelector } from "react-redux";

const AccommodationType = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [selectedOption, setSelectedOption] = useState("Toàn bộ nhà");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const options = [
    {
      title: "Toàn bộ nhà",
      description: "Khách được sử dụng riêng toàn bộ chỗ ở này.",
      icon: "🏠",
    },
    {
      title: "Một căn phòng",
      description:
        "Khách sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu vực chung.",
      icon: "🚪",
    },
    {
      title: "Phòng chung",
      description:
        "Khách ngủ trong một phòng hoặc khu vực chung - nơi bạn hoặc người khác có thể cùng sử dụng.",
      icon: "🏡",
    },
  ];

  const turnSave = async () => {
    setShowConfirmation(true);
  };

  const handleExit = () => {
    setShowConfirmation(false);
  };

  const handleNext = () => {
    // Điều hướng tới HotelRentalPage khi nhấn "Tiếp theo"
    navigate("/host/map");
  };
  const handBack = () => {
    navigate("/");
  };
  const handleSave = async () => {
    const roleId = 3;

    // Kiểm tra nếu roleId không phải là số nguyên
    if (!Number.isInteger(roleId)) {
      console.error("roleId must be an integer number");
      return;
    }

    try {
      await updateRoleUser(user.access_token, { roleId }, navigate);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative flex flex-col items-center h-screen bg-gray-50 p-4">
      {/* Nút Lưu và thoát ở trên cùng */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
          onClick={turnSave}
        >
          Lưu và thoát
        </button>
      </div>

      {/* Tiêu đề */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Khách sẽ được sử dụng loại chỗ ở nào?
      </h2>

      {/* Các tùy chọn chỗ ở */}
      <div className="space-y-4 w-full md:w-1/2">
        {options.map((option, index) => (
          <div
            key={index}
            className={`border rounded-lg p-6 flex items-center cursor-pointer transition duration-200 hover:shadow-lg ${
              selectedOption === option.title
                ? "border-black bg-gray-100"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedOption(option.title)}
          >
            <span className="text-4xl mr-4">{option.icon}</span>
            <div>
              <h3 className="text-lg font-semibold">{option.title}</h3>
              <p className="text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Nút Tiếp theo và Quay lại */}
      <div className="flex justify-between items-center mt-6 w-full md:w-1/2">
        <button
          className="text-gray-500 hover:text-gray-700 transition duration-200"
          onClick={handBack}
        >
          Quay lại
        </button>
        <button
          className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
          onClick={handleNext} // Sử dụng hàm điều hướng khi nhấn "Tiếp theo"
        >
          Tiếp theo
        </button>
      </div>

      {/* Xác nhận Lưu */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Lưu thông tin</h2>
            <p className="text-gray-600">
              Bạn có chắc chắn muốn lưu thông tin này?
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="text-gray-500 mr-4 hover:text-gray-700 transition duration-200"
                onClick={handleExit}
              >
                Thoát
              </button>
              <button
                className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-200"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationType;
