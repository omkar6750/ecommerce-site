import React, { Children } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Auth from './page/auth'
import Shop from './page/shop'
import Cart from './page/cart'
import ShopCategory from './page/shopCategory'
import Footer from './components/Footer'
import mens_banner from './assets/Frontend_Assets/banner_mens.png'
import womens_banner from './assets/Frontend_Assets/banner_women.png'
import kids_banner from './assets/Frontend_Assets/banner_kids.png'
import AdminPage from './page/admin'
import ProductCard from './page/product'
import { useAppStore } from './Store'
import Profile from './page/profile'
import Layout from './page/layout'
import AdminPanel from './page/admin/admin'

 

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
          <Route path={'/auth'} element={<Auth/>}/>
          <Route path={'/mens'} element={<ShopCategory banner={mens_banner} category='men'/>}/>
          <Route path={'/womens'} element={<ShopCategory banner={womens_banner}category='women' />}/>
          <Route path={'/kids'} element={<ShopCategory banner={kids_banner} category='kid'/>}/>
          <Route path={'/product'} element={<ProductCard/>}>
            <Route path={':productId'} element={<ProductCard/>}/>
          </Route>
          <Route path={'/cart'} element={<Cart/>}/>
          <Route path={'/profile'} element={<Profile/>}/>

          <Route path={'/admin'} element={
            <AdminRoute>
              <switch></switch>
              <AdminPanel/>
            </AdminRoute>
            }/>
    
          <Route path='*' element={<Navigate to='/'/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App