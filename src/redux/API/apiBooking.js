import axios from "axios";
export const getbookingLeaveById = async (accessToken) => {
    try {
        const reponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/booking/find/leave`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        // console.log(reponse.data);
        return reponse.data;
    } catch (error) {
        console.log(error);
    }
}
export const accessBooking = async (bookingId,data) => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}api/booking/access-booking/${bookingId}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getHotelById = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/hotels/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const getHotelByIdAndActive = async (roomId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/booking/find/active/${roomId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}