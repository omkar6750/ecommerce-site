import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './page/auth'
import Home from './page/home'
import Shop from './page/shop'
import Cart from './page/cart'
import ShopCategory from './page/shopCategory'
import Product from './page/product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import mens_banner from './assets/Frontend_Assets/banner_mens.png'
import womens_banner from './assets/Frontend_Assets/banner_women.png'
import kids_banner from './assets/Frontend_Assets/banner_kids.png'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<Shop/>}/>
        <Route path={'/auth'} element={<Auth/>}/>
        <Route path={'/mens'} element={<ShopCategory banner={mens_banner} category='mens'/>}/>
        <Route path={'/womens'} element={<ShopCategory banner={womens_banner}category='womens' />}/>
        <Route path={'/kids'} element={<ShopCategory banner={kids_banner} category='kids'/>}/>
        <Route path={'/product'} element={<Product/>}>
          <Route path={':productId'} element={<Product/>}/>
        </Route>
        <Route path={'/cart'} element={<Cart/>}/>
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
      <footer>
        <Footer/>
      </footer>
    </BrowserRouter>
  )
}

export default App