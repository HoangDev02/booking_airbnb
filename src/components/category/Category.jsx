import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../redux/API/apiCategories";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHotelsByIdCategory } from "../../redux/API/apiHotel";
import Place from "../place/Place";
import Map from "../map/Map";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";

function Category() {
  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState([]);
  const [showMaps, setShowMaps] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleButtonClick = () => {
    setShowMaps(!showMaps);
  };
  console.log(showCategory);
  
  useEffect(() => {
    fetchCategories();

    const fetchCategoriesById = async () => {
      try {
        const response = await getAllCategories();
        if (response.length > 0) {
          handleShowCategory(response[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesById();
  }, []);

  const fetchCategories = () => {
    getAllCategories().then((data) => setCategories(data));
  };

  const handleShowCategory = async (id) => {
    const data = await getAllHotelsByIdCategory(id);
    setShowCategory(data);
    setSelectedCategory(id);
    if (showMaps) {
      setShowMaps(false);
      setTimeout(() => setShowMaps(true), 0);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 12,
    slidesToScroll: 12,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container mx-auto mt-10 mb-10">
      <Slider {...settings}>
        {categories?.map((category) => (
          <div
            key={category.id}
            className="p-2 h-[4rem] w-[7rem] text-center relative"
          >
            <img
              src={category.icon}
              alt={category.name}
              className="object-contain h-10 w-10 mx-auto"
            />
            <button
              onClick={() => handleShowCategory(category.id)}
              className={`mt-2 text-sm font-sans hover:border-b-2 hover:border-b-gray-300 hover:border-spacing-1  ${
                selectedCategory === category.id
                  ? "border-b-2 border-black"
                  : ""
              }`}
            >
              <p className="text-sm font-medium ">{category.name}</p>
            </button>
          </div>
        ))}
      </Slider>

      <div className="flex flex-col items-center">
        {!showMaps &&
        Array.isArray(showCategory) &&
        showCategory.length === 0 ? (
          <LoadingSpinner />
        ) : (
          <Place data={showCategory} />
        )}
        <button
          className="bg-black text-white rounded-xl h-[3rem] w-[8rem] my-5"
          onClick={handleButtonClick}
        >
          Hiện bản đồ
        </button>
        {showMaps && <Map close={handleButtonClick} data={showCategory} />}
      </div>
    </div>
  );
}

export default Category;
