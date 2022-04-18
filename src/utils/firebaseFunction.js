import { collection, doc, getDocFromServer, getDocs, orderBy, query, setDoc } from "firebase/firestore";
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

// export const saveCate = async (data) => {
//     await setDoc(
//         doc(firestore, "foodCates", `${Date.now()}`), data, {merge: true}
//     )
// }