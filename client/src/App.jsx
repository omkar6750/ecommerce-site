import React, { Children } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Auth from './page/auth'
import Shop from './page/shop'
import Cart from './page/cart'
import ShopCategory from './page/shopCategory'
import Product from './page/product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import mens_banner from './assets/Frontend_Assets/banner_mens.png'
import womens_banner from './assets/Frontend_Assets/banner_women.png'
import kids_banner from './assets/Frontend_Assets/banner_kids.png'
import AdminPage from './page/admin'
import ProductCard from './page/product'
import { useAppStore } from './Store'

 

function App() {

  const AdminRoute = ({children}) => {
    const {userInfo} = useAppStore()
    isAdmin = userInfo.is_admin
    return isAdmin?  children:<Navigate to='/'/>
  }
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Shop/>}/>
        <Route path={'/auth'} element={<Auth/>}/>
        <Route path={'/mens'} element={<ShopCategory banner={mens_banner} category='men'/>}/>
        <Route path={'/womens'} element={<ShopCategory banner={womens_banner}category='women' />}/>
        <Route path={'/kids'} element={<ShopCategory banner={kids_banner} category='kid'/>}/>
        <Route path={'/product'} element={<ProductCard/>}>
          <Route path={':productId'} element={<ProductCard/>}/>
        </Route>
        <Route path={'/cart'} element={<Cart/>}/>
        {<AdminRoute>
        <Route path={'/admin'} element={<AdminPage/>}/>
        </AdminRoute>}
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </BrowserRouter>
  )
}

export default App