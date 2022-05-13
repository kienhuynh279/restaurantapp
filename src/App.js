import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header, CreateContainer, MainContainer, TableContainer, EditContainer } from './components'
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems, getFoodById, getLimitFoodItem } from './utils/firebaseFunction'
import { actionType } from './context/reducer'


const App = () => {
  const [{ foodItems, foodLimit }, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  const fetchLimitData = async () => {
    await getLimitFoodItem().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_LIMIT,
        foodLimit: data,
      });
    });
  }

  // const fetchFoodId = async () => {
  //   await getFoodById(id).then((data) => {
  //     dispatch({
  //       type: actionType.GET_FOOD_BY_ID,
  //       foodId: data,
  //     });
  //   });
  // }

  // console.log(id);

  

  useEffect(() => {
    fetchData();
    fetchLimitData();
    // fetchFoodId();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col bg-primary snap-y overflow-auto'>
        <Header />
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />}></Route>
            <Route path='/food' element={<TableContainer />}></Route>
            <Route path='/food/create' element={<CreateContainer />}></Route>
            <Route path='/food/edit/:id' element={<EditContainer />}></Route>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  )
}

export default App