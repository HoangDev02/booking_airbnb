import { Link } from "react-router-dom";
// import "./searchItem.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SearchItem = ({ item }) => {
  console.log("item", item);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="pt-10">
      <div className="flex w-[20rem]">
        <div className="flex items-center ">
          <div className=" w-[20rem] rounded-md  mt-10">
          <Slider {...settings}>
              {item?.hotel?.photos?.map((photo, index) => (
                <img
                  key={index}
                  src={`${photo}`}
                  alt=""
                  className="rounded-md w-[100%] object-cover h-[20rem]"
                />
              ))}
            </Slider>
              
            <h3 className="text-lg font-semibold mt-2 "><Link to={`/room/${item.hotel.slug}`}>{item.hotel.name}</Link></h3>
            <p className="text-sm text-gray-500">
              2 guests · 1 bedroom · 1 bed · 1 bath
            </p>
            <p className="text-sm text-gray-500">
              <span>${item.hotel.cheapestPrice}</span> / đêm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
