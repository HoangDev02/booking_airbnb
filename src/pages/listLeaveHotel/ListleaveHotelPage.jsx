import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { deleteHotel, getAllHotels, getHotelByUserId } from "../../redux/API/apiHotel";
import FormCreateHotel from "../formHotel/FormCreateHotel";
import FormLeaveHotel from "../formleaveHotel/FormLeaveHotel";
import HotelRentalPage from "../HotelRental/HotelRentalPage";
import FormUpdateHotel from "../formHotel/FormUpdateHotel";

function ListleaveHotelPage() {
    const [selectedUser, setSelectedUser] = useState("");
    const [isRegister, setIsRegister] = useState(null);
    const [isLoadingCreateRoom, setIsLoadingCreateRoom] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    const [hotelsList, setHotelsList] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
           const response = await getHotelByUserId(user._id, user.accessToken);
           setHotelsList(response);
        }
        fetchHotels();
    }, [user._id, user.accessToken]);
    
    const handleSelectChange = (event) => {
      setSelectedUser(event.target.value);
    };

    const handleEdit = (id) => {
      setIsRegister(id);
    };
    const handleCancel = () => {
      setIsRegister(null);
    };
    const handleLoadingCreateRoom = () => {
      setIsLoadingCreateRoom(!isLoadingCreateRoom);
    };

    const handleDelete = async (id) => {
        try {
            await deleteHotel(id, user.accessToken);
            setHotelsList(hotelsList.filter(hotel => hotel._id !== id));
        } catch (error) {
            console.error("Failed to delete hotel", error);
        }
    };

    return (
      <>
        <div className="relative overflow-x-auto px-[7rem] pt-20">
          <div className="flex gap-5 items-center">
            {isLoadingCreateRoom ? (
              <button>
                <FormLeaveHotel onClose={handleLoadingCreateRoom} />
              </button>
            ) : (
              <button
                onClick={handleLoadingCreateRoom}
                className="bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                Tạo Phòng
              </button>
            )}
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  type
                </th>
                <th scope="col" className="px-6 py-3">
                  city
                </th>
                <th scope="col" className="px-6 py-3">
                  address
                </th>
                <th scope="col" className="px-6 py-3">
                  distance
                </th>
                <th scope="col" className="px-6 py-3">
                  title
                </th>
                <th scope="col" className="px-6 py-3">
                  desc
                </th>
                <th scope="col" className="px-6 py-3">
                  cheapestPrice
                </th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {selectedUser === "" &&
                hotelsList?.map((data, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data?.name}
                    </th>
                    <td className="px-6 py-4 text-gray-900">{data.type}</td>
                    <td className="px-6 py-4 text-gray-900">{data.city}</td>
                    <td className="px-6 py-4 text-gray-900">{data.address}</td>
                    <td className="px-6 py-4 text-gray-900">{data?.distance}</td>
                    <td className="px-6 py-4 text-gray-900">{data?.title}</td>
                    <td className="px-6 py-4 text-gray-900">{data?.desc}</td>
                    <td className="px-6 py-4 text-gray-900">{data?.cheapestPrice}</td>
                  
                    <td className="px-6 py-4 text-gray-900">
                      {isRegister === data._id ? (
                        <>
                          <FormUpdateHotel hotelData={data} onClose={handleCancel}/>
                          <button
                            onClick={() => handleEdit(data._id)} 
                            className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              handleEdit(data._id);
                            }}
                            className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleDelete(data._id);
                            }}
                            className="px-4 py-2 mr-2 w-[5rem] text-white bg-red-500 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default ListleaveHotelPage;
