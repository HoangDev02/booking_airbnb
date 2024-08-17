import axios from "axios";
import { hotelsFailed, hotelsStart, hotelsSuccess } from "../hotelSlice";
export const createHotel = async (hotelData, accessToken,navigater) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/hotels/create`,
      hotelData,
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(response.status );
    if(response.status === 200){
      navigater("/")
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
export const getAllHotels = async (dispatch) => {
  dispatch(hotelsStart());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/hotels`
    );
    dispatch(hotelsSuccess(response.data));
  } catch (error) {
    hotelsFailed(error);
  }
};
export const  getAllHotelsByIdCategory = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/hotels/find/category/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getHotelByUserId = async (id,accessToken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/hotels/find/user/${id}`, {
      headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
};
export const deleteHotel = async(id,accessToken) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}api/hotels/${id}`, {
      headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
}
export const updateHotel = async (id,hotelData,accessToken) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}api/hotels/${id}`,hotelData, {
      headers: { authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data
  } catch (error) {
    console.log(error);
  }
}