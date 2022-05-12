import React from "react";
import {
  MdModeEditOutline,
  MdDelete,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const TableContainer = () => {
  const [{ foodItems, foodLimit }] = useStateValue();

  return (
    <div className="">
      <div className="flex justify-around">
        <div className="text-2xl py-2 font-semibold">Food List in App</div>
        <Link to={"/food/create"}>
          <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-black text-base">
            New Item
          </p>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-orange-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Food Name
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Calories
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-2 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {foodLimit &&
              foodLimit.map((item) => (
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
                    <a
                      href={"/createItem"}
                      className="text-2xl px-4 py-1  bg-red-500 text-white rounded-lg shadow-md"
                    >
                      <MdDelete></MdDelete>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex py-3 justify-between items-center">
          <span className="text-sm text-gray-700 ml-6">
            Showing <span className="font-semibold text-gray-900 ">1</span> to{" "}
            <span className="font-semibold text-gray-900">5</span> of{" "}
            <span className="font-semibold text-gray-900 ">100</span> Entries
          </span>
          <div className="inline-flex mr-6">
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 ">
              <MdArrowBack className="mr-2 w-5 h-5"></MdArrowBack> Prev
            </button>
            <button className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 ">
              Next<MdArrowForward className="ml-2 w-5 h-5"></MdArrowForward>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableContainer;
