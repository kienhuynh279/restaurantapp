import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

// saving new Item
export const saveItem = async (data) =>{
    await setDoc(
        doc(firestore, "foodItems", `${Date.now()}`), data, {merge: true})
}

export const getAllFoodItem = async () =>{
    const item = await getDocs(
        query(collection(firestore, "fooditems"), orderBy("id", "desc"))
    )

    return item.docs.map(doc => doc.data())
}