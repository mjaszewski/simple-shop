import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Products from './pages/Products'
import Cart from './pages/Cart'
import NoMatch from './pages/NoMatch'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}
