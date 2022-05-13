import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { firestore } from "../firebase.config";

// saving new Item
export const saveItem = async (data) =>{
    await setDoc(
        doc(firestore, "foodItems", `${Date.now()}`), data, {merge: true})
}

export const getAllFoodItems = async () =>{
    const item = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
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