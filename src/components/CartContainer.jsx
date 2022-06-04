import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase.config";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { saveOrder } from "../utils/firebaseFunction";
import { v4 as uuidv4 } from "uuid";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [openModal, setOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAdddress] = useState("");

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

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
    }
  };

  const saveItem = () => {
    const data = {
      id: uuidv4(),
      listFood: cartItems.map((item) => item.title),
      price: 10,
      address: address,
      phone: phone,
      email: user.email,
    };

    saveOrder(data);
    setOpenModal(false);
    alert("Đơn hàng của bạn đã được gửi đến đầu bếp !");
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      {openModal && (
        <div className="fixed bg-orange-100 p-2 h-800">
          <h1 className="  font-medium text-2xl relative">
            Xác nhận đơn hàng
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setOpenModal(false)}
              className="absolute -top-1 text-3xl right-1 cursor-pointer"
            >
              <p>x</p>
            </motion.div>
          </h1>

          <h1 className="font-semibold text-xl mt-3">
            Danh sách các món ăn của bạn gồm:
          </h1>
          <ul>
            {cartItems.map((i) => (
              <li className="ml-3 text-base font-medium" key={i.id}>
                {i.title}
              </li>
            ))}
          </ul>
          <h3 className="font-semibold text-xl my-3">
            Điền SĐT và địa chỉ giao hàng để hoàn thành xác nhận đơn hàng
          </h3>
          <input
            className="w-full ml-4  text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            type="text"
            placeholder="Nhập số điện thoại...."
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="w-full ml-4 mt-2 text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            type="text"
            placeholder="Nhập địa chỉ giao hàng...."
            onChange={(e) => setAdddress(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg px-4 mt-4"
            onClick={saveItem}
          >
            Xác nhận
          </motion.button>
        </div>
      )}
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-3xl text-black" />
        </motion.div>
        <p className="text-lg text-black">Giỏ hàng</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.6 }}
          className="flex items-center justify-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-sm duration-100 ease-in-out
          transition-all cursor-pointer text-black text-base"
        >
          Xóa <RiRefreshFill />
        </motion.p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2em] flex flex-col">
          {/* cart item section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart item  */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section  */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Tiền thức ăn</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Phí giao hàng</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Tổng cộng</p>
              <p className="text-gray-200 text-xl font-semibold">
                $ {tot + 2.5}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={() => setOpenModal(!openModal)}
              >
                Đặt ngay !
              </motion.button>
            ) : (
              <motion.button
                onClick={login}
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Đăng nhập để đặt hàng
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="emty cart" />
          <p className="text-xl text-black font-semibold">
            Thêm món ăn vào giỏ hàng
          </p>
        </div>
      )}
      {/* bottom section */}
    </motion.div>
  );
};

export default CartContainer;
