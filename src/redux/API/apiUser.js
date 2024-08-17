import axios from "axios";

export const getUsersById = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/users/${userId}`,{withCredentials: true});
      return response.data;
    } catch (error) {
      throw error;
    }
}