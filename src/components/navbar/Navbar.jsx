import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/API/apiAuth";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import Logo from "../../assets/logo.png";
import { TfiAlignJustify } from "react-icons/tfi";
import { TfiLinux } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Header from "../header/Header";
import { getUsersById } from "../../redux/API/apiUser";
const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isUser, setIsUser] = useState("");
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWTLOGOUT = createAxios(user, dispatch, logoutSuccess);
  const accessToken = user?.access_token;
  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleLogout = () => {
    logOut(dispatch, navigate, accessToken);
  };
  const handleLoadingLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };
  const handleLoadingRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 230) {
        setIsSticky(true);
      }else {
        setIsSticky(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const reponse = await getUsersById(accessToken)
        setIsUser(reponse);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser()
  }, []);
  
  return (
    <div className={`container-fluid flex ${isSticky ? 'sticky top-0 bg-white z-999 shadow-md h-[5rem] transition-all duration-200 ease-in-out' : 'transition-all duration-300 ease-in-out'}`} >
      <div className="flex  align-items-center w-[100%]" >
        <div className="basis-1/5 ml-10">
          <Link
            to="/"
            className="text-inherit no-underline flex align-items-center"
          >
            <img src={Logo} alt="logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-red-500">Airbnb</span>
          </Link>
        </div>
          <div className="basis-1/2">
            <ul className="flex justify-center">
              <li className="navbar-hover">Chổ ở</li>
              <li className="ml-10 navbar-hover ">Trải nghiệm</li>
            </ul>
          </div>
         {
          isUser.roleId === 3 ? (
            <div className="basis-1/6">
            <Link className="navbar-hover" to={"/hosting"}>Đón tiếp khách</Link>
          </div>
          ):(
          <div className="basis-1/6">
            <Link className="navbar-hover" to={"/host/homes"}>Cho thuê chổ ở qua Airbnb</Link>
          </div>
          )
         }
        {user ? (
          <div className="basis-1/7 border-2 rounded-xl " ref={menuRef}>
            <div className="flex justify-center">
              <div className="flex">
                <div onClick={() => setIsOpen(!isOpen)} className="flex">
                    <TfiAlignJustify className="h-[35px] w-[35px] p-[10px] text-black" />
                  <div className="border-2 rounded-full bg-slate-500">
                    <TfiLinux className="text-white p-[10px] h-[35px] w-[35px]" />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute bg-white text-black py-2 rounded m-5 border-2 z-999">
                  <h3 className="block px-4 py-2 hover:bg-gray-200 font-bold">
                    {user.username}
                  </h3>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Cho thuê chổ ở qua Airbnb
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    trung tâm hỗ trợ
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="basis-1/7 border-2 rounded-2xl hover:shadow-lg " ref={menuRef}>
            <div className="flex justify-center">
              <div className="flex">
                <div onClick={() => setIsOpen(!isOpen)} className="flex">
                    <TfiAlignJustify className="h-[35px] w-[35px] p-[10px] text-black" />
                  <div className="border-2 rounded-full bg-slate-500">
                    <TfiLinux className="text-white p-[10px] h-[35px] w-[35px]" />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute bg-white text-black py-2 rounded border-2 z-999 mt-5 right-[5rem]">
                  {isOpenLogin ? (
                    <>
                      <Login onClose={handleLoadingLogin} />
                      <button
                        onClick={handleLoadingLogin}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Đăng nhập
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLoadingLogin}
                      className="block px-4 py-2 hover:bg-gray-200  h-full w-full text-left"
                    >
                      Đăng nhập
                    </button>
                  )}
                  {isOpenRegister ? (
                    <>
                      <Register onClose={handleLoadingRegister} />
                      <button
                        onClick={handleLoadingRegister}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Đăng kí
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLoadingRegister}
                      className="block px-4 py-2 hover:bg-gray-200 h-full w-full text-left"
                    >
                      Đăng kí
                    </button>
                  )}
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Cho thuê chổ ở qua Airbnb
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    trung tâm hỗ trợ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
