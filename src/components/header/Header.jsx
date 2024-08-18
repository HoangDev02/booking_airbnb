import "./header.css";
import { DateRange } from "react-date-range";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [provinces, setProvinces] = useState([]);

  const [address, setAddress] = useState({
    city: "",
  });
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const formatDateToString = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Thêm số 0 đằng trước nếu cần
    const date = String(dateObj.getDate()).padStart(2, "0"); // Thêm số 0 đằng trước nếu cần
    return `${year}-${month}-${date}`;
  };

  const formatDatesToArrayOfStrings = (datesArray) => {
    return datesArray.map((dateObj) => ({
      startDate: formatDateToString(dateObj.startDate),
      endDate: formatDateToString(dateObj.endDate),
      key: dateObj.key,
    }));
  };

  const handleSearch = () => {
    if (!dates[0].startDate || !dates[0].endDate) {
      alert("Vui lòng chọn ngày nhận phòng và trả phòng");
      return;
    }

    const formattedDates = formatDatesToArrayOfStrings(dates);
    navigate(
      `/search?city=${destination}&startDate=${formattedDates[0].startDate}&endDate=${formattedDates[0].endDate}&adult=${options.adult}&children=${options.children}`
    );
    onSearch({ destination, dates, options });
  };
  return (
    <div className="header mt-10">
      <div className="headerSearch">
        <div className="text-black font-bold">
          <h3>Địa điểm</h3>
          <input
            type="text"
            placeholder="Tìm kiếm điểm đến"
            className="headerSearchInput text-black"
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="headerSearchItem">
          <div className="flex p-2">
            <div className="flex items-center border-r border-l border-gray-200">
              <div className="ml-5 mr-5">
                <h3 className="text-black font-bold">Nhận Phòng</h3>
                <span
                  className="text-black"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {dates[0].startDate
                    ? format(dates[0].startDate, "MM/dd/yyyy")
                    : "Chọn ngày"}
                </span>
              </div>
            </div>

            <div className="flex items-center border-r  border-gray-200">
              <div className="ml-5 mr-5">
                <h3 className="text-black font-bold">Trả Phòng</h3>
                <span
                  className="text-black"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {dates[0].endDate
                    ? format(dates[0].endDate, "MM/dd/yyyy")
                    : "Chọn ngày"}
                </span>
              </div>
            </div>
          </div>
          {openDate && (
            <div className="absolute flex justify-center z-20">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date border-2 border-gray-200 rounded-lg shadow-lg p-2 bg-white text-black"
                minDate={new Date()}
                months={2}
                direction="horizontal"
              />
            </div>
          )}
        </div>
        <div className="">
          <h3 className="text-black font-bold">Khách</h3>
          <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText"
          >{`${options.adult} adult · ${options.children} children `}</span>
          {openOptions && (
            <div className="options">
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
                  <span className="optionCounterNumber">{options.adult}</span>
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
            </div>
          )}
        </div>
        <div className="headerSearchItem">
          <button
            className="headerBtn flex items-center justify-center bg-red-500 text-white rounded-full w-10 h-10"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
