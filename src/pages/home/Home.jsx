import { useSelector } from "react-redux";
import Category from "../../components/category/Category";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./home.css";
import ReservationItem from "../../components/reservationItem/ReservationItem";
import Lesve from "../../components/lease/Lease";
import { useEffect, useState } from "react";
import { getUsersById } from "../../redux/API/apiUser";


const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [userDate, setUserDate] = useState(null);
  const fetchUser = async () => {
    try {
      const reponse = await getUsersById(user.userId);
      setUserDate(reponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [user]);
  return ( 
    <div>
      {/* 3 tương ung với lease */}
      {userDate?.roleId === 3 ? ( 
        <div className="container mt-10">
          <Lesve user={user} />
          <ReservationItem user={user} />
        </div>
      ) : (
        <div>
          <Header />
          <div className="flex flex-col align-middle gap-8 mt-[4rem]">
            <Category />
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
