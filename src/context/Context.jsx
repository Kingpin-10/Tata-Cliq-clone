import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Load from localStorage or fallback to empty
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ Add to Cart with Quantity & Size Handling
  const addToCart = (product) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === product.size
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    toast.success(`${product.name} added to Cart`);
  };

  // ✅ Add to Favourites (No duplicates)
  const addToFavourites = (product) => {
    const alreadyInFavourites = favourites.some((item) => item.id === product.id);
    if (!alreadyInFavourites) {
      setFavourites((prev) => [...prev, product]);
      toast.success(`${product.name} added to favourites`);
    } else {
      toast(`${product.name} is already in favourites`, { icon: "❤️" });
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        favourites,
        setFavourites,
        addToCart,
        addToFavourites,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
