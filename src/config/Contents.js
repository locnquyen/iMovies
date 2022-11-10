import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Catalog from '../pages/Catalog';
import { Detail } from '../pages/detail/Detail';
import { Home } from '../pages/Home';

 const Contents = () => {
  return (
    <Routes>
       <Route
                path='/:category/search/:keyword'
                element={<Catalog/>}
            />
            <Route
                path='/:category/:id'
                element={<Detail/>}
            />
            <Route
                path='/:category'
                element={<Catalog/>}
            />
            <Route
                path='/'
                exact
                element={<Home/>}
            />
    </Routes>
  )
}
export default Contents
