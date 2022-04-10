import { motion } from "framer-motion";
import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { Link } from "react-router-dom";
import Avatar from "../img/avatar.png";
import Logo from "../img/logo.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
  };

  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* Desktop & Tablet */}
      <div className="hidden md:flex w-full h-full flex justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-black text-xl font-bold"> Kien Food</p>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              Home
            </li>
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              Menu
            </li>
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              About Us
            </li>
            <li className="text-base text-black hover:text-black duration-100 transition-all ease-in-out cursor-pointer ">
              Services
            </li>
          </ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-black text-2xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
              alt="userProfile"
              onClick={login}
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
