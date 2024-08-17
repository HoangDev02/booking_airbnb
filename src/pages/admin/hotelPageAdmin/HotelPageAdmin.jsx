import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllHotels } from "../../../redux/API/apiHotel";
import FormCreateHotel from "../../formHotel/FormCreateHotel";

function HotelPageAdmin() {
  const [selectedUser, setSelectedUser] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true); // add loading state
  const [isRegister, setIsRegister] = useState(null);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const hotelsList = useSelector((state) => state.hotels.hotels?.hotel);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllHotels(dispatch);
  }, []);
  
  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleEdit = (id) => {
    setIsRegister(id);
  };

  const handleCancel = () => {
    setIsRegister(null);
  };

  const handleDelete = async (id) => {
    //   DeleteAlert(async () => {
    //     await deleteDevice(id,cookie);
    //     getPans(dispatch,cookie);
    //   }
    //   );
  };

  const handleLoadingCreate = () => {
    setIsLoadingCreate(true);
  };

  const handleLoadingCancel = () => {
    setIsLoadingCreate(false);
  };

  return (
    <>
      <div class="relative overflow-x-auto  px-[7rem] pt-20">
        <div className="flex gap-5 items-center">
          {/* Lọc thiết bị */}
          <select
            class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg"
            onChange={handleSelectChange}
            value={selectedUser}
          >
            <option value="">Chọn thiết bị</option> {/* add a default option */}
            {hotelsList?.map((data, index) => (
              <option value={data.id} key={index}>
                {data.name}
              </option>
            ))}
          </select>
          {isLoadingCreate ? (
            <button>
              <FormCreateHotel onclose={handleLoadingCancel} />
            </button>
          ) : (
            <button
              onClick={handleLoadingCreate}
              className=" bg-[#47A992] hover:bg-[#24c9a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Tạo mới 
            </button>
          )}
        </div>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                name
              </th>
              <th scope="col" class="px-6 py-3">
                type
              </th>
              <th scope="col" class="px-6 py-3">
                city
              </th>
              <th scope="col" class="px-6 py-3">
                address
              </th>
              <th scope="col" class="px-6 py-3">
                distance
              </th>
              <th scope="col" class="px-6 py-3">
                title
              </th>
              <th scope="col" class="px-6 py-3">
                desc
              </th>
              <th scope="col" class="px-6 py-3">
                cheapestPrice
              </th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {selectedUser === "" &&
              hotelsList?.map((data, index) => (
                <tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data?.name}
                  </th>
                  <td class="px-6 py-4 text-gray-900">{data.type}</td>
                  <td class="px-6 py-4 text-gray-900" >{data.city}</td>
                  <td class="px-6 py-4 text-gray-900">{data.address}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.distance}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.title}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.desc}</td>
                  <td class="px-6 py-4 text-gray-900">{data?.cheapestPrice}</td>
                
                  <td class="px-6 py-4 text-gray-900" >
                    {isRegister === data.id ? (
                      <>
                        {/* <FormUpdateDevice
                            initialData={data}
                            id={data.id}
                            onClose={handleCancel}
                          /> */}
                        <button
                          onClick={() => handleEdit(data.id)} // Wrap handleEdit in an arrow function
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
                            handleEdit(data.id);
                          }}
                          className="px-4 py-2 mr-2 w-[5rem] text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(data.id);
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

export default HotelPageAdmin;
