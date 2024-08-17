import React, { useEffect, useState } from "react";
import RoomImg from "../../components/roomDetail/RoomDetail";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Comments from "../../components/comments/Comments";
function RoomDetail() {
  const { slug } = useParams();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [room, setRoom] = useState(null);
 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/hotels/find/${slug}`)
      .then((response) => {
        setRoom(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [slug]); 
  
  if (!room) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <RoomImg data={room} />

      <Comments hotelId={room.id}/>
     
      <Footer />
    </div>
  );
}

export default RoomDetail;
