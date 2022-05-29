import React from 'react'
import { useParams } from 'react-router-dom';
import { deleteFood } from "../../utils/firebaseFunction";

const DeleteFood = () => {
  const food_id = useParams();
  const id = food_id.id;

  const deleteItem = () => {
    deleteFood(id);
    console.log('Đã xóa');
  }

  return (
    <button onClick={deleteItem}>Bạn có chắc sẽ xóa</button>
  )
}

export default DeleteFood