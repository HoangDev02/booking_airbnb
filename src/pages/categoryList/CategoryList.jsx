import React, { useState, useEffect } from "react";
import {
  getAllCategories,
  deleteCategory,
} from "../../redux/API/apiCategories";
import FormCreateCategory from "../formCategory/FormCreateCategory";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const fetchCategories = () => {
    getAllCategories().then((data) => setCategories(data));
  };

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId)
      .then(() => {
        // Remove the deleted category from the state
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };
  const handleLoading = () => {
    setLoading(true);
  };
  const handleNotLoading = () => {
    setLoading(false);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      {loading ? (
        <>
          <FormCreateCategory onClose={handleNotLoading} />
          <button onClick={handleLoading}>Create Category</button>
        </>
      ) : (
        <button onClick={handleLoading}>Create Category</button>
      )}

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category._id} className="border p-4 rounded">
            <div className="flex justify-center mb-2">
              <img
                src={category.icons}
                alt={category.name}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{category.name}</p>
            </div>
            <div className="flex justify-center mt-2 space-x-2">
              <button
                onClick={() => handleDelete(category._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              {/* Add Edit button and functionality here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
