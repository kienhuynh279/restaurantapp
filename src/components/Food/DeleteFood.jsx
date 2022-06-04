import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import {
  deleteFood,
  getAllFoodItems,
  saveItem,
} from "../../utils/firebaseFunction";
import { firestore } from "../../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const DeleteFood = () => {
  const food_id = useParams();
  const id = food_id.id;
  const [{ foodItems }, dispatch] = useStateValue();
  const foodId = foodItems.filter((item) => {
    return item.id === id;
  });
  const navigate = useNavigate();

  const handleDelete = async () => {
    const foodRef = doc(firestore, "foodItems", id);
    try {
      await deleteDoc(foodRef);

      alert("Đã xóa !!");
      await getAllFoodItems();
      navigate("/food");
    } catch (err) {
      alert("loi c", err);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-9 flex-col mt-6">
        <p className="text-2xl">
          Bạn có muốn xóa sản phẩm:{" "}
          <span className="text-orange-500 font-bold">{foodId[0].title}</span>{" "}
          thuộc danh mục:{" "}
          <span className="text-orange-500 font-bold">
            {foodId[0].category}
          </span>
        </p>
        <img className="w-275 flex my-5" src={foodId[0].imageUrl} alt="" />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="p-3 m-2 bg-green-500 rounded-md text-lg font-bold"
          onClick={handleDelete}
        >
          Xóa
        </button>
        <button className="p-3 m-2 bg-red-500 rounded-md text-lg font-bold">
          Hủy
        </button>
      </div>
    </div>
  );
};

export default DeleteFood;
