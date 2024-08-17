import React from 'react'

function HomeowerInfo({data}) {
    
   const splitDate = (date) => {
    
    const d = new Date(date);
    return `${d.getFullYear()}`;
   }
   
  return (
    <>
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md flex space-x-6 ">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              src={data?.img ? data?.img : "https://i.pravatar.cc/300"}
              alt="Host"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{data?.username}</h2>
            <p className="text-gray-600">Bắt đầu đón tiếp khách từ năm {splitDate(data?.createAt)}</p>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800">
            Thông tin Chủ nhà
          </h3>
          <p className="mt-2 text-gray-700">Tỉ lệ phản hồi: 100%</p>
          <p className="mt-1 text-gray-700">Phản hồi trong vòng 1 ngày</p>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Nhắn tin cho Chủ nhà
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc
            liên lạc bên ngoài trang web hoặc ứng dụng Airbnb.
          </p>
        </div>
      </div>
    </>
  )
}

export default HomeowerInfo