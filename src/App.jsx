import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar"
import ProductList from "./pages/ProductList"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import ProductDetail from "./pages/ProductDetail";
import FavouritesPage from "./pages/FavouritesPage";


function App() {
  
  return (
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar/>
      <Routes>
        <Route path= "/" element ={<Home/>} />
        <Route path="products" element={<ProductList />} />
        <Route path= "login" element ={<Login/>} />
        <Route path= "favourite" element ={<FavouritesPage/>} />
        <Route path= "cart" element ={<Cart/>} />
        <Route path= "/product/:id" element ={<ProductDetail/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
