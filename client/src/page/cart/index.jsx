import { useAppStore } from "@/Store";
import React, { useState, useEffect } from "react";

const Cart = () => {
    const { cart, addToCart, removeFromCart, clearCart } = useAppStore();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Calculate total price based on cart items
        setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }, [cart]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Shopping Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <p className="text-lg font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-600">${item.price}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="px-2 py-1 text-white bg-red-500 rounded-full hover:bg-red-600"
                                >
                                    -
                                </button>
                                <p className="text-lg">{item.quantity}</p>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="px-2 py-1 text-white bg-green-500 rounded-full hover:bg-green-600"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg">
                        <p className="text-lg font-semibold">Total: </p>
                        <p className="text-xl font-bold">${total.toFixed(2)}</p>
                    </div>
                    <div className="text-center mt-6">
                        <button
                            onClick={clearCart}
                            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
