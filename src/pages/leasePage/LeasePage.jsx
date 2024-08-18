import React from "react";
import Lesve from "../../components/lease/Lease";
import ReservationItem from "../../components/reservationItem/ReservationItem";
import { useSelector } from "react-redux";

function LeasePage() {
  const user = useSelector((state) => state.auth.login.currentUser);
 
  return (
    <div className="container mt-10">
      <Lesve user={user} />
      <ReservationItem user={user} />
    </div>
  );
}

export default LeasePage;
