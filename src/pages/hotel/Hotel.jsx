import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

const Hotel = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}api/rooms/hotel/${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((room, index) => (
        <div key={index}>
          <h2><Link to={`/Room/${room.slug}`}>{room.title}</Link></h2>
          <p>{room.desc}</p>
          <p>Price: {room.price}</p>
          <p>Max people: {room.maxPeople}</p>
          {room.img.map((image, index) => (
            <img key={index} src={image} alt={room.title} />
          ))}
          <h3>Room Numbers:</h3>
          {room.roomNumbers.map((roomNumber, index) => (
            <p key={index}>Number: {roomNumber.number}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Hotel;