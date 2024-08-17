import axios from "axios";
export const getOrderByIdUser = async (idUser) => {
    try {
        const response = await axios.get(`http://localhost:8800/api/orders/getOrder/${idUser}`);
        return response.data;
    } catch (error) {
        console.log("Error getting order by id user:", error);
        throw error;
    }
}