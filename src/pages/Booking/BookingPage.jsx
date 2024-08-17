import React from "react";
import BookingForm from "./BookingForm";
import queryString from "query-string";

function BookingPage() {
  const currentUrl = window.location.href;

  // Tách các tham số từ URL
  const parsedUrl = queryString.parseUrl(currentUrl);

  //  console.log("Query parameters:", parsedUrl.query.roomId);

  return (
    <div className="container mt-10">
      {/* chia 2 màng hình */}
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <div>
            <BookingForm data={parsedUrl.query}/>
            <hr className="border-t border-gray-400 mt-2" />
            <div className="pt-3">
              <h2 className="font-bold">Bắt buộc cho chuyến đi của bạn</h2>
              <div className="flex justify-between mt-3">
                <div className="block">
                  <h4 className="font-bold">Nhắn tin cho chủ nhà</h4>
                  <p>
                    Hãy chia sẻ lý do bạn đi du lịch, những ai đi cùng bạn và
                    những điều khiến bạn hài lòng về chỗ ở.
                  </p>
                </div>
                <button className="border border-black rounded-md h-[2rem] w-[4rem] p-2 flex items-center justify-center">
                  Thêm
                </button>
              </div>
              <div className="flex justify-between mt-3">
                <div className="block">
                  <h4 className="font-bold">Số điện thoại</h4>
                  <p>
                    Thêm và xác nhận số điện thoại của bạn để nhận thông tin cập
                    nhật về chuyến đi.
                  </p>
                </div>
                <button className="border border-black rounded-md h-[2rem] w-[4rem] p-2 flex items-center justify-center">
                  Thêm
                </button>
              </div>
            </div>
            <hr className="border-t border-gray-400 mt-2" />
            <div className="flex justify-between mt-3">
              <div className="block">
                <h4 className="font-bold">Chính sách hủy</h4>
                <p>Đặt phòng/đặt chỗ này không được hoàn tiền.</p>
              </div>
              <button className="border border-black rounded-md  p-2 flex items-center justify-center">
                Tìm hiểu thêm
              </button>
            </div>
            <hr className="border-t border-gray-400 mt-2" />
            <div className="flex justify-between mt-3">
              <div className="block">
                <h4 className="font-bold">Quy chuẩn chung</h4>
                <p>Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy chuẩn đơn giản để làm một vị khách tuyệt vời.</p>
                <ul className="ml-5">
                    <li>* Tuân thủ nội quy nhà</li>
                    <li>* Giữ gìn ngôi nhà như thể đó là nhà bạn</li>
                </ul>
              </div>
            </div>
            <hr className="border-t border-gray-400 mt-2" />
            <p className="font-sans text-sm">Bằng việc chọn nút bên dưới, tôi đồng ý với Nội quy nhà của Chủ nhà, Quy chuẩn chung đối với khách, Chính sách đặt lại và hoàn tiền của Airbnb, và đồng ý rằng Airbnb có thể tính phí vào phương thức thanh toán của tôi nếu tôi phải chịu trách nhiệm về thiệt hại. Tôi đồng ý thanh toán tổng số tiền được hiển thị nếu Chủ nhà chấp nhận yêu cầu đặt phòng của tôi.</p>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default BookingPage;
