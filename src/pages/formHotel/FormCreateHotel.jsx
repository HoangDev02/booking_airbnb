import React, { useEffect, useState } from "react";
import { createHotel } from "../../redux/API/apiHotel";
import { getAllCategories } from "../../redux/API/apiCategories";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function FormCreateHotel({ onclose, data, location }) {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryId: 0,
    name: "",
    type: "",
    city: location.city || "",
    address: location.road + ", " + location.quarter + "," + location.suburb || "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    slug: "",
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
      await createHotel(formDataToSend, user?.access_token, navigate);
      toast.success("Tạo khách sạn thành công!");
      setFormData({
        categoryId: 0,
        name: "",
        type: "",
        city: "",
        address: "",
        distance: "",
        photos: [],
        title: "",
        desc: "",
        rating: 0,
        slug: "",
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 relative overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <ToastContainer />
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
        <h2 className="text-2xl font-bold mb-6 text-center">Create Hotel</h2>
        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.categoryId}
            onChange={handleChange}
            name="categoryId"
            id="categoryId"
          >
            <option value="">Select Category</option>
            {isCategoryData.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Hotel slug"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div className="grid grid-cols-1 gap-4 mb-4">
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
            rows="4"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
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
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
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
              min="0"
              step="0.01"
              value={formData.cheapestPrice}
              onChange={handleChange}
              placeholder="Cheapest Price"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <label
            htmlFor="featured"
            className="inline-flex items-center"
          >
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featured: e.target.checked,
                })
              }
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          >
            Create Hotel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateHotel;
