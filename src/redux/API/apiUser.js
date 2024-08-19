import axios from "axios";

export const getUsersById = async (access_token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/users`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoleUser = async (access_token, role, navigate) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}api/users/update`,
      role,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.status === 200) {
      navigate("/hosting");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
