import React from "react";
import { useStore } from "../context/Context";
import { Trash, Minus, Plus } from "lucide-react";

const Cart = () => {
  const { cart, setCart } = useStore();

  // Remove item based on id & size
  const handleRemove = (id, size) => {
    const updated = cart.filter((item) => !(item.id === id && item.size === size));
    setCart(updated);
  };

  // Increase item quantity
  const increaseQty = (id, size) => {
    const updated = cart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCart(updated);
  };

  // Decrease item quantity or remove if it goes below 1
  const decreaseQty = (id, size) => {
    const updated = cart
      .map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updated);
  };

  // Calculate total price safely
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="px-4 md:px-8 py-8 bg-[#f5f5f5] min-h-screen">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.name} {item.size && `(Size: ${item.size})`}
                  </h3>
                  <p className="text-gray-600 text-sm">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id, item.size)}
                      className="btn btn-xs btn-outline"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-medium">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id, item.size)}
                      className="btn btn-xs btn-outline"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id, item.size)}
                className="btn btn-sm btn-error text-white"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="mt-6 p-4 bg-white rounded-lg shadow flex justify-between items-center">
            <h3 className="text-lg font-semibold">Total: ₹{totalPrice}</h3>
            <button className="btn btn-primary">Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
