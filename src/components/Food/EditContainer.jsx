import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import Loader from "../Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import { getAllFoodItems, updateFood } from "../../utils/firebaseFunction";
import { categories } from "../../utils/data";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from "react-router-dom";

const EditContainer = (props) => {
  const food_id = useParams();
  const ref_id = food_id.id;
  const [{ foodItems }, dispatch] = useStateValue();
  const foodId = foodItems.filter(item => {
    return item.id === ref_id
  })
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imgAsset, setImgAsset] = useState();
  const [fields, setFields] = useState(false);
  const [alertStatus, setAletStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoangding] = useState(false);
  const nevigate = useNavigate()
 
  const uploadImage = (e) => {
    setIsLoangding(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `image/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
   

    uploadTask.on(
      "state_change",
      (snapshot) => {
        const uploadProcess =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Thêm ảnh không thành công!!");
        setAletStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoangding(false);
        }, 2000); 
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgAsset(downloadUrl);
          setIsLoangding(false);
          setFields(true);
          setMsg("Thêm ảnh thành công !!");
          setAletStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 2000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoangding(true);
    const deleteRef = ref(storage, imgAsset);
    deleteObject(deleteRef).then(() => {
      setImgAsset(null);
      setIsLoangding(false);
      setFields(true);
      setMsg("Đã xóa ảnh !!");
      setTimeout(() => {
        setFields(false);
      }, 2000);
    });
  };

  const saveDetail = () => {
    setIsLoangding(true);
    try {
      if (!title || !calories || !imgAsset || !price || !category) {
        setFields(true);
        setMsg("Lỗi khi sửa!! Vui lòng thử lại");
        setAletStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoangding(false);
        }, 2000);
      } else {
        const data = {
          id: ref_id,
          title: title,
          imageUrl: imgAsset,
          calories: calories,
          category: category,
          qty: 1,
          price: price,
        };

        updateFood(data);
        setFields(true);
        setMsg("Sửa dữ liệu thành công !!");
        setAletStatus("success");
        setTimeout(() => {
          setFields(false);
          setIsLoangding(false);
          clearData();
        }, 2000);

        nevigate('/food')
      }
    } catch (error) {
      setFields(true);
      setMsg("Nhập đầy đủ các giá trị !!");
      setAletStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoangding(false);
      }, 2000);
    }

    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImgAsset(null);
    setCategory("Chọn loại món ăn");
    setPrice("");
    setCalories("");
  };

  const setData = () => {
    setTitle(foodId[0].title)
    setCalories(foodId[0].calories)
    setCategory(foodId[0].category)
    setImgAsset(foodId[0].imageUrl)
    setPrice(foodId[0].price)
  }

  useEffect(() => {
    setData();
  }, []);

  

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-[90%] md:w-[75%] border border-gray-200 rounded-lg p-4 flex flex-col justify-center">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFastfood className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col bottom-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imgAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700"></MdCloudUpload>
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imgAsset}
                      alt="upload img"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white"></MdDelete>
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl"></MdFoodBank>
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl"></MdAttachMoney>
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full mt-4">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetail}
          >
            Save
          </button>
        </div>

        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold mt-2 ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default EditContainer;
