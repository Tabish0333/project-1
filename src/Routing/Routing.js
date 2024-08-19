import React from 'react'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Header from '../layout/Header'
import AddProduct from '../components/AddProduct'
import ViewProduct from '../components/ViewProduct'
import ProductDetails from '../components/ProductDetails'
import EditProducts from '../components/EditProducts'



const Routing = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='' element={<AddProduct/>}/>
        <Route path='viewProduct' element={<ViewProduct/>}/>
        <Route path='viewproduct/viewproduct/:userid' element={<ProductDetails/>}/>
        <Route path='viewproduct/editproducts/:userid' element={<EditProducts/>}/>
    </Routes>
      
    </BrowserRouter>
  )
}

export default Routing
