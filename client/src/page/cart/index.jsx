import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/Store";
import { HOST } from "@/Utils/constants";
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
			<h1 className="mb-5 mt-28 text-center text-3xl font-bold">Shopping Cart</h1>

			{cart.length === 0 ? (
				<p className="text-center text-gray-600">Your cart is empty.</p>
			) : (
				<div className="flex">
					<div className="w-2/3 space-y-4 rounded-md border p-1">
						{cart.map((item) => (
							<div key={item.id} className="boder p-6">
								<div className="flex items-center justify-between rounded-md border bg-white shadow-sm">
									<div className="flex items-center space-x-4">
										<div className="m-2 border p-2">
											<img
												src={`${HOST}/uploads/${item.product_image}`}
												alt={item.name}
												className="h-52 w-40 rounded-md object-cover"
											/>
										</div>
										<div>
											<p className="text-lg font-semibold">{item.name}</p>
											<p className="text-sm text-gray-600">${item.price}</p>
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<button
											onClick={() => removeFromCart(item.id)}
											className="rounded-full bg-red-500 px-2 py-1 text-white hover:bg-red-600"
										>
											-
										</button>
										<p className="text-lg">{item.quantity}</p>
										<button
											onClick={() => addToCart(item)}
											className="rounded-full bg-green-500 px-2 py-1 text-white hover:bg-green-600"
										>
											+
										</button>
									</div>
								</div>
							</div>
						))}
						<div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-lg">
							<p className="text-lg font-semibold">Total: </p>
							<p className="text-xl font-bold">${total.toFixed(2)}</p>
						</div>
						<div className="mt-6 text-center">
							<button
								onClick={clearCart}
								className="rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600"
							>
								Clear Cart
							</button>
						</div>
					</div>
					<div className="border-b border-t"></div>
				</div>
			)}
		</div>
	);
};

export default Cart;
