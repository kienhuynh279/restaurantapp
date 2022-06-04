import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveOrder = async (data) => {
    await setDoc(
        doc(firestore, "orders", `${data.phone}`), data, {merge: true}
    )
}

// saving new Item
export const saveItem = async (data) =>{
    await setDoc(
        doc(firestore, "foodItems", `${data.id}`), data, {merge: true})
}

export const updateFood = async (data) =>{
    const ref = doc(collection(firestore, 'foodItems'), data.id);

    await updateDoc(ref, data)
}

export const deleteFood = async (id) => {
    await deleteDoc(doc(firestore, "foodItems", id));
}

export const getAllFoodItems = async () =>{
    const item = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    )

    return item.docs.map(doc => doc.data())
}

export const deleteOrder = async (phone) => {
    await deleteDoc(doc(firestore, "orders", phone))
}

export const getOrderList = async () => {
    const item = await getDocs(
        query(collection(firestore, "orders"))
    )

    return item.docs.map(doc => doc.data())
}

export const getLimitFoodItem = async () =>{
    const item = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"), limit(5))
    )

    return item.docs.map(doc => doc.data())
}
    
export const getFoodById = async (id) =>{
    const item = await getDocs(
        query(collection(firestore, "foodItems"), where('id' === id), orderBy("id", "desc"))
    )

    return item.docs.map(doc => doc.data())
}