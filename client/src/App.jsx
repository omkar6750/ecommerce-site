import React, { Children } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './page/auth'
import Shop from './page/shop'
import Cart from './page/cart'
import ShopCategory from './page/shopCategory'
import mens_banner from './assets/Frontend_Assets/banner_mens.png'
import womens_banner from './assets/Frontend_Assets/banner_women.png'
import kids_banner from './assets/Frontend_Assets/banner_kids.png'
import ProductCard from './page/product'
import { useAppStore } from './Store'
import Profile from './page/profile'
import Layout from './page/layout'
import AdminPanel from './page/admin/admin'
import CreateProduct from './page/admin/createProduct.jsx'
import EditProduct from './page/admin/editProduct.jsx'
import DeleteProduct from './page/admin/deleteProduct'
import ExperimentalUI from './page/experimental'

 

function App() {

  const AdminRoute = ({children}) => {
    const {userInfo} = useAppStore()
    const isAdmin = userInfo && userInfo.is_admin
    return isAdmin?  children : <Navigate to='/'/>
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout/>}>
          <Route index element={<Shop/>}/>
          <Route path={'/experimental'} element={<ExperimentalUI/>} />
          <Route path={'/auth'} element={<Auth/>}/>
          <Route path={'/mens'} element={<ShopCategory banner={mens_banner} category='male'/>}/>
          <Route path={'/womens'} element={<ShopCategory banner={womens_banner}category='female' />}/>
          <Route path={'/kids'} element={<ShopCategory banner={kids_banner} category='kid'/>}/>
          <Route path={'/product'} element={<ProductCard/>}>
            <Route path={':productId'} element={<ProductCard/>}/>
          </Route>
          <Route path={'/cart'} element={<Cart/>}/>
          <Route path={'/profile'} element={<Profile/>}/>

          <Route path="/admin" element={<AdminPanel />}>
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="edit-product" element={<EditProduct />} />
            <Route path='delete-product' element={<DeleteProduct/>}/>
          </Route>
          <Route path='*' element={<Navigate to='/'/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App