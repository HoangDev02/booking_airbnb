import { createRoom } from "../../redux/API/apiRoom";
import { getHotelByUserId } from "../../redux/API/apiHotel";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

function FormLeaveHotel({ onClose }) {
    const user = useSelector((state) => state.auth.login.currentUser);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [maxPeople, setMaxPeople] = useState("");
    const [desc, setDesc] = useState("");
    const [roomNumbers, setRoomNumbers] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [hotelsList, setHotelsList] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState("");

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await getHotelByUserId(user._id, user.accessToken);
                setHotelsList(response);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !name ||
            !price ||
            !maxPeople ||
            !desc ||
            !roomNumbers ||
            !selectedHotel
        ) {
            setErrorMessage("Please fill out all fields");
            return;
        }

        const formattedRoomNumbers = JSON.parse(roomNumbers).map((room) => ({
            number: room.number,
            unavailableDates: room.unavailableDates || [],
        }));

        const roomData = {
            hotelid: selectedHotel,
            title: name,
            price: parseFloat(price),
            maxPeople: parseInt(maxPeople),
            desc,
            roomNumbers: formattedRoomNumbers,
        };

        try {
            await createRoom(roomData);
            setSuccessMessage("Room created successfully");
        } catch (error) {
            console.error("Error creating room:", error);
            setErrorMessage("Failed to create room");
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setSelectedHotel(value);
    };

    return (
        <div className="fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <form
                onSubmit={handleSubmit}
                className="h-auto w-[30rem] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-8 flex flex-col justify-between text-black"
            >
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                <select
                    className="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg"
                    value={selectedHotel}
                    onChange={handleChange}
                    name="hotels"
                >
                    <option value="">Chọn thể loại</option>
                    {hotelsList?.map((data) => (
                        <option value={data._id} key={data._id}>
                            {data.name}
                        </option>
                    ))}
                </select>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="maxPeople"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Max People
                    </label>
                    <input
                        type="number"
                        id="maxPeople"
                        value={maxPeople}
                        onChange={(e) => setMaxPeople(e.target.value)}
                        className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="desc"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label
                        htmlFor="roomNumbers"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Room Numbers (JSON)
                    </label>
                    <textarea
                        id="roomNumbers"
                        value={roomNumbers}
                        onChange={(e) => setRoomNumbers(e.target.value)}
                        className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-black font-semibold py-2 px-4 rounded-md self-center mb-4"
                >
                    Create New
                </button>
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
              
            </form>
        </div>
    );
}

export default FormLeaveHotel;
