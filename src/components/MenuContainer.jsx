import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);

  return (
    <section className="w-full my-3" id="menu">
      <div className="w-full flex flex-col justify-center items-center">
        <p
          className="text-2xl font-semibold capitalize relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 
            before:-bottom-2 before:left-11 before:bg-gradient-to-tr from-orange-400 to-orange-600 
            transition-all ease-in-out duration-100"
        >
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((item) => (
              <motion.div
                onClick={() => {
                  setFilter(item.urlParamName);
                }}
                whileTap={{ scale: 0.6 }}
                key={item.id}
                className={`group ${
                  filter === item.urlParamName ? "bg-red-600" : "bg-cardColor"
                } hover:bg-red-600 w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 
          items-center justify-center duration-150 transition-all ease-in-out`}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.urlParamName ? "bg-cardColor" : "bg-red-600"
                  } group-hover:bg-cardColor flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === item.urlParamName
                        ? "text-red-600"
                        : "text-white"
                    } group-hover:text-red-600 text-lg`}
                  ></IoFastFood>
                </div>
                <p
                  className={`text-sm ${
                    filter === item.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {item.name}
                </p>
              </motion.div>
            ))}
        </div>
      </div>

      <div className="w-full">
        <RowContainer
          flag={false}
          data={foodItems?.filter((n) => n.category === filter)}
        ></RowContainer>
      </div>
    </section>
  );
};

export default MenuContainer;
