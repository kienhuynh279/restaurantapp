import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData"

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    user: userInfo,
    foodItems: [],
    cartShow: false,
    cartItems: cartInfo,
    foodLimit: null,
    foodId: null,
    orderList: null
}