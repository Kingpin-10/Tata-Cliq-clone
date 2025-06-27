import React, { useState } from "react";
import { useStore } from "../context/Context";
import { Trash, ShoppingCart, X } from "lucide-react";
import toast from "react-hot-toast";

const FavouritesPage = () => {
  const { favourites, setFavourites, addToCart } = useStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
    toast.success("Removed from favourites");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    // Add product to cart with selected size and quantity 1
    addToCart({ ...selectedProduct, size: selectedSize });
  
    // Close modal and reset state
    setSelectedProduct(null);
    setSelectedSize("");
  };

  return (
    <div className="px-4 md:px-8 py-8 bg-[#f5f5f5] min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Favourites</h2>

      {favourites.length === 0 ? (
        <p className="text-gray-600">You have no favourites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favourites.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
              <div className="mt-2">
                <p className="text-sm text-gray-500">{item.brand}</p>
                <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-700 font-medium">₹{item.price}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="btn btn-sm btn-primary"
                  >
                    <ShoppingCart size={14} className="mr-1" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromFavourites(item.id)}
                    className="btn btn-sm btn-error"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for size selection */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => {
                setSelectedProduct(null);
                setSelectedSize("");
              }}
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Select Size for {selectedProduct.name}
            </h3>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`btn btn-sm ${
                    selectedSize === size ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-block btn-primary"
            >
              Confirm and Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;
