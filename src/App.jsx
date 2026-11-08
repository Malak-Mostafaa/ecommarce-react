import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'

import Categories from './pages/Categories'
import CategoryDetails from './pages/CategoryDetails'

import Brands from './pages/Brands'
import BrandDetails from './pages/BrandDetails'

import Register from './pages/Register'
import Login from './pages/Login'

import ForgotPassword from './pages/ForgotPassword'
import VerifyCode from './pages/VerifyCode'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'

import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'

import './App.css'

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route path="/categories" element={<Categories />} />

        <Route
          path="/categories/:id"
          element={<CategoryDetails />}
        />

        <Route path="/brands" element={<Brands />} />

        <Route
          path="/brands/:id"
          element={<BrandDetails />}
        />

        {/* Authentication Pages */}

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-code"
          element={<VerifyCode />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Protected Pages */}

        <Route element={<ProtectedRoute />}>

          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<Orders />} />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App