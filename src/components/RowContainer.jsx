import React from "react";

const RowContainer = ({ flag }) => {
  return (
    <div
      className={`w-full my-12 ${
        flag ? "overflow-x-scroll" : "overflow-x-hidden"
      }`}
    >
      <div className="w-full md:w-350 h-20 bg-blue-300 shadow-md backdrop-blur-lg">
        <div className="w-full flex justify-between items-center">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default RowContainer;
