import axios from "axios";
import { Alert } from "../../components/alert/Alert";

export const getCommentByHotelId = async (hotelId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/comments/hotel/${hotelId}`
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 403) {
      Alert(2500, "Thông báo", "Bạn chưa đặt khách sạn", "error", "OK");
    }
    console.log(error);
    
  }
};
export const getCountComment = async (hotelId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/comments/count/${hotelId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
