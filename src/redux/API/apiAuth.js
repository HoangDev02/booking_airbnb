import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../authSlice";
import { Alert } from "../../components/alert/Alert";
// import {deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess} from '../userSlide'

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/auth/login`,
      user,
      { withCredentials: true }
    );
    dispatch(loginSuccess(res.data));
  } catch (err) {
    if(err.response.status === 403) { 
      Alert(2500, 'Thông báo', 'Sai email hoặc mật khẩu!','error', 'OK');
    }
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/auth/register`,
      user
    );
    dispatch(registerSuccess());
  } catch (err) {
    if(err.response.status === 403) {
      Alert(2500, 'Thông báo', 'Email đã tồn tại!','error', 'OK');
    }
    dispatch(registerFailed());
  }
};



// export const deleteUser = async(accessToken,dispatch,id,axiosJWT) => {
//     dispatch(deleteUsersStart());
//     try {
//         const res = await axiosJWT.delete(`${process.env.REACT_APP_BACKEND_URL}user/delete/`+ id, {
//             headers: { authorization: `Bearer ${accessToken}`}
//         })
//         dispatch(deleteUsersSuccess(res.data))
//     } catch (error) {
//         dispatch(deleteUsersFailed())
//     }
// }
export const logOut = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}api/auth/logout`,
    
    );
    if (response.status === 201) {
      dispatch(logoutSuccess());
      navigate("/");
    }
  } catch (err) {
    dispatch(logoutFailed());
  }
};
