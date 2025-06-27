import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../context/Context";
import { ShoppingCart, Heart } from "lucide-react";
import allProducts from "../data/Products";

const sizes = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, addToFavourites } = useStore();
  const product = allProducts.find((item) => item.id === Number(id));
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <div className="p-10 text-red-500">Product not found.</div>;
  }

  return (
    <div className="px-4 md:px-10 py-10 bg-[#f9f9f9] min-h-screen">
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-[500px] object-cover rounded-lg"
        />

        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-4">₹{product.price}</p>

          <div className="mb-4">
            <p className="font-medium text-sm text-gray-700 mb-2">Select Size:</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded-md text-sm font-medium transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              disabled={!selectedSize}
              onClick={() => addToCart({ ...product, size: selectedSize })}
              className="btn btn-primary disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
            </button>
            <button
              onClick={() => addToFavourites(product)}
              className="btn btn-outline"
            >
              <Heart className="w-4 h-4 mr-2" /> Favourite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
