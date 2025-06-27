import { Menu, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../context/Context";
import allProducts from "../data/Products";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { cart, favourites } = useStore();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredResults(results.slice(0, 5)); // Limit to 5
  };

  const handleResultClick = (productId) => {
    setSearchTerm("");
    setFilteredResults([]);
    navigate(`/product/${productId}`);
  };

  return (
    <div className="navbar bg-gray-900 text-amber-50 px-4 md:px-8 sticky top-0 z-50 shadow-md">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://logowik.com/content/uploads/images/tata-cliq1303.logowik.com.webp"
            alt="Tata CLiQ Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center - Search (Desktop) */}
      <div className="navbar-center w-full max-w-md px-2 hidden md:flex relative">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered w-full text-black"
          />
          {filteredResults.length > 0 && (
            <ul className="absolute z-50 bg-white text-black w-full mt-1 border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right - Icons */}
      <div className="navbar-end space-x-4 hidden lg:flex relative">
        <Link to="/favourite" className="btn btn-ghost btn-circle relative">
          <Heart className="w-5 h-5" />
          {favourites.length > 0 && (
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              {favourites.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className="btn btn-ghost btn-circle relative">
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="badge badge-sm badge-primary absolute -top-1 -right-1">
              {cart.length}
            </span>
          )}
        </Link>
        <Link to="/login" className="btn btn-ghost btn-circle">
          <User className="w-5 h-5" />
        </Link>
      </div>

      {/* Hamburger - Mobile */}
      <div className="lg:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Search */}
      <div className="w-full mt-2 block md:hidden relative">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="input input-bordered w-full text-black"
          />
          {filteredResults.length > 0 && (
            <ul className="absolute z-50 bg-white text-black w-full mt-1 border rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-base-100 shadow-md rounded-box w-48 z-50 text-black">
          <ul className="menu p-2 text-sm">
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/favourite">Favourites</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
