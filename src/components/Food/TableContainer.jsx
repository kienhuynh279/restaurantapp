import React, { useState, useEffect } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { deleteFood, getAllFoodItems } from "../../utils/firebaseFunction";

const TableContainer = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [search, setSearch] = useState("");
  const [filteredFood, setFilteredFood] = useState([]);

  const handleDeleteFood = async (id) => {
    deleteFood(id);
    alert("Đã xóa !!");
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllFoodItems().then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      });
    };

    fetchData();
  });

  useEffect(() => {
    setFilteredFood(
      foodItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, foodItems]);

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="text-center">
          <div className="text-2xl py-2 font-semibold">
            Danh sách các món ăn
          </div>
        </div>
        <div className="flex flex-row mb-6 justify-evenly">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control
                        block
                        min-w-6xl
                        px-3
                        py-1
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-orange-500 focus:outline-none"
            placeholder="Nhập tên món ăn"
          />
          <Link to={"/food/create"}>
            <p className="rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer bg-green-400 hover:bg-green-500 transition-all duration-100 ease-in-out text-black text-base">
              Thêm mới
            </p>
          </Link>
        </div>
      </div>
      <div className="relative shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase rounded-md bg-orange-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Món ăn
              </th>
              <th scope="col" className="px-6 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Loại thức ăn
              </th>
              <th scope="col" className="px-6 py-3">
                Năng lượng
              </th>
              <th scope="col" className="px-6 py-3">
                Giá
              </th>
              <th scope="col" className="px-2 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFood &&
              filteredFood.map((item) => (
                <tr key={item.id} className="bg-cardColor border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.title}
                  </th>
                  <th className="px-6">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                    />
                  </th>
                  <td className="px-6 py-4 text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-gray-600">{item.calories}</td>
                  <td className="px-6 py-4 text-gray-600">$ {item.price}</td>
                  <td className="px-2 py-4 text-right flex">
                    <Link
                      to={`/food/edit/${item.id}`}
                      className="text-2xl px-4 py-1 mr-2 bg-green-500 text-white rounded-lg shadow-md"
                    >
                      <MdModeEditOutline></MdModeEditOutline>
                    </Link>
                    <button
                      onClick={() => handleDeleteFood(item.id)}
                      className="text-2xl px-4 py-1  bg-red-500 text-white rounded-lg shadow-md"
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContainer;
