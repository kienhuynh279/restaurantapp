import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Avatar from "../img/avatar.png";
import Logo from "../img/logo.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);

    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-2 px-4 md:p-3 md:px-16 bg-primary bg-gray-50">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-black text-xl font-bold"> Kien Food</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <Link
              to={"/"}
              className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer "
            >
              Home
            </Link>
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              Menu
            </li>
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              About Us
            </li>
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              Services
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-black text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                annimate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "kienhuynh279@gmail.com" && (
                    <Link to={"/createItem"}>
                      <p
                        onClick={() => setIsMenu(false)}
                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-black text-base"
                      >
                        New Item <MdAdd></MdAdd>
                      </p>
                    </Link>
                )}

                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-black text-base"
                >
                  Log out <MdLogout></MdLogout>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-black text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-black text-xl font-bold"> Kien Food</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              annimate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "kienhuynh279@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-black text-base">
                    New Item <MdAdd></MdAdd>
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Home
                </li>
                <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  About Us
                </li>
                <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">
                  Services
                </li>
              </ul>

              <p
                onClick={logout}
                className="m-2 p-2 rounded-md shadow-lg px-4 py-2 flex items-center justify-center bg-slate-200 gap-3 cursor-pointer hover:bg-gray-300-100 transition-all duration-100 ease-in-out text-black text-base"
              >
                Log out <MdLogout></MdLogout>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
