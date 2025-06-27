import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, X } from "lucide-react";
import { useStore } from "../context/Context";
import toast from "react-hot-toast";
import allProducts from "../data/Products";

const ProductList = () => {
  const { addToCart, addToFavourites } = useStore();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory"); // ✅ read subcategory from URL

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subcategoryParam || "All Products" // ✅ default selectedSubcategory
  );

  // Dynamically extract subcategories based on selected category
  const subcategories = useMemo(() => {
    const filtered = allProducts.filter((item) => item.category === category);
    const unique = [...new Set(filtered.map((item) => item.subcategory))];
    return ["All Products", ...unique];
  }, [category]);

  // Filter products by category and subcategory
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const matchesSubcategory =
      selectedSubcategory === "All Products" ||
      product.subcategory === selectedSubcategory;
    return matchesCategory && matchesSubcategory;
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({ ...selectedProduct, size: selectedSize });
    toast.success(`${selectedProduct.name} (Size ${selectedSize}) added to cart`);
    setSelectedProduct(null);
    setSelectedSize("");
  };

  return (
    <div className="px-4 md:px-8 py-8 bg-[#f5f5f5] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {category ? `${category} Clothing` : "All Products"}
        </h2>
        <select
          className="select select-bordered select-sm w-48"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          {subcategories.map((sub, i) => (
            <option key={i} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition"
          >
            <Link to={`/product/${product.id}`} className="block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
            </Link>

            <div className="p-3">
              <p className="text-xs text-gray-500">{product.brand}</p>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-base font-semibold text-gray-900 mt-1">
                ₹{product.price}
              </p>

              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="btn btn-sm btn-primary"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => addToFavourites(product)}
                  className="btn btn-sm btn-outline"
                >
                  <Heart className="w-4 h-4" /> Favourite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Size Modal */}
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

            <button onClick={handleAddToCart} className="btn btn-block btn-primary">
              Confirm and Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
