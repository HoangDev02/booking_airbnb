import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../redux/API/apiAuth";
import { loginSuccess } from "../../redux/authSlice";
import "./login.css";
import facebook from "../../assets/vecteezy_facebook-logo-png-facebook-icon-transparent-png_18930698.png";
import google from "../../assets/vecteezy_google-search-icon-google-product-illustration_12871371.png";
const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };

    try {
      setError(""); // Xóa thông báo lỗi trước đó (nếu có)
      const res = await loginUser(newUser, dispatch, navigate);
      dispatch(loginSuccess(res.data));
    } catch (err) {}
  };
  const openRegisterPage = () => {
    window.open("/register", "_blank", "noopener,noreferrer");
  };
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative bg-white w-96 rounded-md shadow-lg p-8">
        <button
          type="button"
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Log in</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="formUsername"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="formUsername"
              type="email"
              placeholder="Enter your username"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="formPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="formPassword"
              type={isShowPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg  "
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 pt-4 flex items-center cursor-pointer"
              onClick={handleShowPassword}
            >
              <FontAwesomeIcon icon={isShowPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <button
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md mb-4"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
          <div className="text-center text-gray-700">
            Don't have an account yet?
          </div>
          <button
            className="block ml-20 text-center text-indigo-600 hover:underline"
            onClick={openRegisterPage}
          >
            Register one for free
          </button>
        <button className="flex items-center justify-between text-black py-2 px-4 rounded w-full border-solid border-1 border-black mt-2 hover:bg-[#F7F7F7]">
          <img src={facebook} alt="Facebook" className="h-6 w-6 mr-2" />
          <span className="flex-grow text-center font-sans">
            Tiếp tục với Facebook
          </span>
        </button>
        <button className="flex items-center justify-between text-black  py-2 px-4 rounded w-full mt-2 border-solid border-1 border-black hover:bg-[#F7F7F7]">
          <img src={google} alt="Google" className="h-4 w-4 mr-2 ml-1" />
          <span className="flex-grow text-center font-sans">
            Tiếp tục với Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
