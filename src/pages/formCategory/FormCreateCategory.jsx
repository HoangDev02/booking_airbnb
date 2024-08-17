import React, { useState, useEffect } from "react";
import { addCategory } from "../../redux/API/apiCategories";
function FormCreateCategory({onClose}) {
  const [name, setName] = useState("");
  const [icons, setIcons] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !icons) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    await addCategory({ name, icons });
  };

  return (
    <div className="fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form onSubmit={handleSubmit}  className="h-auto w-[30rem] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg p-8 flex flex-col justify-between text-black">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div>
        <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
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
          <label htmlFor="icons" className="block">
            Category Icons
          </label>
          <input
            type="text"
            id="icons"
            value={icons}
            onChange={(e) => setIcons(e.target.value)}
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

export default FormCreateCategory;
