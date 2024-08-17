import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import queryString from "query-string";
import axios from "axios";

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adult: 1,
    children: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/search/find?city=${searchParams.destination}&startDate=${searchParams.startDate}&endDate=${searchParams.endDate}&adult=${searchParams.adult}&children=${searchParams.children}`
      );
      console.log(response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(searchParams);
  }, [searchParams]);

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    setSearchParams({
      destination: queryParams.city,
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      adult: queryParams.adult,
      children: queryParams.children
    });
  }, []);
  const handleSearch = ({ destination, dates, options }) => {
    const formattedStartDate = dates[0].startDate.toISOString().split('T')[0];
    const formattedEndDate = dates[0].endDate.toISOString().split('T')[0];
    setSearchParams({
      destination,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      adult: options.adult,
      children: options.children,
    });
  };


  return (
    <div>
      <Header type="container mx-auto px-4 " onSearch={handleSearch} />
      <div className="container grid gap-x-8 gap-y-4 grid-cols-4 pt-10 ">
        {loading
          ? "Loading..."
          : data.map((item) => <SearchItem item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default List;
