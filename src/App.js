import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import Navbar from "./components/navbar/Navbar";
import BookingForm from "./pages/Booking/BookingForm";
import FormCreateCategory from "./pages/formCategory/FormCreateCategory";
import CategoryList from "./pages/categoryList/CategoryList";
import FormCreateHotel from "./pages/formHotel/FormCreateHotel";
import HotelPageAdmin from "./pages/admin/hotelPageAdmin/HotelPageAdmin";
import BookingPage from "./pages/Booking/BookingPage";
import HotelRentalPage from "./pages/HotelRental/HotelRentalPage";
import ListleaveHotelPage from "./pages/listLeaveHotel/ListleaveHotelPage";
import VnPayReturn from "./pages/vnpay/VnPayReturn";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search?" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/Room/:slug" element={<RoomDetail/>}/>
        {/* <Route path="/booking" element={<BookingForm/>}/> */}
        
        {/* category */}
        <Route path="/admin/hotel" element={<HotelPageAdmin/>}/>
        <Route path="/leave/hotel" element={<ListleaveHotelPage/>}/>
        <Route path="/category" element={<CategoryList/>}/>
        <Route path="/Booking" element={<BookingPage/>}/>
        <Route path="/host/homes" element={<HotelRentalPage/>}/>
        <Route path="/vnpay/return?" element={<VnPayReturn/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
