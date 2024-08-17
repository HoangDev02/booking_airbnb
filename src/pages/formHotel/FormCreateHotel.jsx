import React, { useEffect, useState } from "react";
import { createHotel } from "../../redux/API/apiHotel";
import { getAllCategories } from "../../redux/API/apiCategories";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function FormCreateHotel({ onclose, data }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    type: "",
    city: "",
    address: data.address || "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    lat: data?.latlng[0],
    long: data?.latlng[1],
    rating: 0,
    cheapestPrice: 0,
    featured: false,
  });
  const [isCategoryData, setIsCategoryData] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files],
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "photos") {
          formData[key].forEach((file) => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      await createHotel(formDataToSend, user?.accessToken,navigate);
      toast.success("Tạo khách sạn thành công!");
      
      setFormData({
        category: "",
        name: "",
        type: "",
        city: "",
        address: "",
        distance: "",
        photos: [],
        title: "",
        desc: "",
        rating: 0,
        cheapestPrice: 0,
        featured: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create hotel.");
    }
  };

  useEffect(() => {
    getAllCategories().then((data) => {
      setIsCategoryData(data);
    });
  }, []);
  
  return (
    <div className="fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
      <form
        onSubmit={handleSubmit}
        className="h-auto w-[30rem] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-8 flex flex-col justify-between text-black"
        style={{ maxHeight: "30rem", overflowY: "auto" }}
      >
        <ToastContainer />
        <select
          className="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg"
          value={formData.category}
          onChange={handleChange}
          name="category"
        >
          <option value="">Chọn thể loại</option>
          {isCategoryData?.map((data) => (
            <option value={data._id} key={data._id}>
              {data.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-1 gap-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Hotel Name"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Hotel Type"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="distance"
            className="block text-sm font-medium text-gray-700"
          >
            Distance
          </label>
          <input
            type="text"
            name="distance"
            id="distance"
            value={formData.distance}
            onChange={handleChange}
            placeholder="Distance"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700"
          >
            Photos
          </label>
          <input
            type="file"
            name="photos"
            id="photos"
            multiple
            onChange={handleFileChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Description"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="cheapestPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Cheapest Price
          </label>
          <input
            type="number"
            name="cheapestPrice"
            id="cheapestPrice"
            value={formData.cheapestPrice}
            onChange={handleChange}
            placeholder="Cheapest Price"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="featured"
            className="block text-sm font-medium text-gray-700"
          >
            Featured
          </label>
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Create Hotel
          </button>
        </div>
        <div>
          <Link to="/" className="text-center text-blue-500">Quay trở lại</Link>
        </div>
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onclose}
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

export default FormCreateHotel;
