import axios from "axios";
import { Alert } from "../../components/alert/Alert"

export const getAmenitiesByHotelId = async (hotelId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/amentities/hotel/${hotelId}`);
        return response.data;
    } catch (error) {
        Alert("error", "Error", error.message);
    }
}