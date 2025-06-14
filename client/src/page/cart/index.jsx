import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, removeCartItem, addToCart, clearCart, cartCheckout } from "@/cartApi";
import { HOST } from "@/Utils/constants";
import { toast } from "sonner";
import {
	FileMinus,
	FolderMinusIcon,
	ListMinus,
	LucideCross,
	MinusCircle,
	MinusIcon,
	MinusSquare,
	MinusSquareIcon,
	PlusIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import crossLogo from "@/assets/Frontend_Assets/noun-close-cross-1202535.svg";
import { useAppStore } from "@/Store";
import ProfileModal from "@/components/ProfileModal";

const CartPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const navigate = useNavigate();
	const [removeOne, setRemoveOne] = useState(false);
	const queryClient = useQueryClient();
	const { userInfo } = useAppStore();

	const {
		data: cart,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["cart"],
		queryFn: getCart,
		refetchOnWindowFocus: false,
	});

	const addToCartMutation = useMutation({
		mutationFn: (product) => {
			const currentQuantity =
				cart.items.find((item) => item.product_id === product.id)?.quantity || 0;
			return addToCart(product.product_id, 1, product.variant_sku);
		},
		onSuccess: () => {
			toast.success("Added to cart successfully");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: () => toast.error("Failed to add to cart"),
	});

	const removeCartItemMutation = useMutation({
		mutationFn: (cartItemId) => removeCartItem(cartItemId, removeOne ? 1 : null),
		onSuccess: () => {
			toast.success("Item removed from cart");

			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: () => toast.error("Failed to remove item"),
	});

	const clearCartMutation = useMutation({
		mutationFn: clearCart,
		onSuccess: () => {
			toast.success("Cart cleared");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "Failed to clear cart");
		},
	});

	const cartCheckoutMutation = useMutation({
		mutationFn: () => cartCheckout(),
		onSuccess: () => {
			toast.success("Order placed successfully");
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			clearCart();
			// navigate("/orders");
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "Failed to clear cart");
		},
	});
	const handleCartCheckout = async () => {
		if (!userInfo.profileSetup && !userInfo.address) {
			setIsModalOpen(true);
		} else {
			try {
				cartCheckoutMutation.mutate();
			} catch (error) {}
		}
	};

	if (isLoading) return <div className="w-full p-6 text-center">Loading cart...</div>;
	if (error) {
		navigate("/auth");
	}

	const totalPrice = cart?.items.reduce((sum, item) => {
		const itemPrice = item.product.new_price || 0;
		return sum + itemPrice * item.quantity;
	}, 0);

	const formattedTotalPrice = totalPrice ? totalPrice.toFixed(2) : "0.00";

	return (
		<section className="w-full bg-gray-100 p-10">
			<div className="w-full p-5">
				<div className="mx-auto rounded-lg bg-white p-6 shadow-lg">
					<h1 className="mb-10 mt-6 text-center text-3xl font-bold">Shopping Cart</h1>
					{cart.items.length === 0 ? (
						<p className="text-center text-gray-600">Your cart is empty.</p>
					) : (
						<div className="mx-auto grid w-[80vw] grid-cols-1 gap-8 lg:grid-cols-3">
							<div className="space-y-6 lg:col-span-2">
								{cart.items.map((item) => (
									<div
										key={item.id}
										className="flex h-72 items-center justify-between rounded-lg border bg-gray-50 p-4 shadow-sm"
									>
										<div className="flex h-5/6 items-center space-x-4">
											<img
												src={`${HOST}/uploads/${item.product.product_image}`}
												alt={item.name}
												className="h-64 rounded-lg object-contain"
											/>
											<div className="flex h-full flex-col justify-around">
												<div className="">
													<p className="text-xl font-semibold text-gray-800">
														{item.product.name}
													</p>
													<p className="text-lg text-gray-600">
														₹{item.product.new_price}
													</p>
													<p className="text-lg uppercase">
														{item.variant.size}
													</p>
												</div>
												<div className="flex items-center space-x-2">
													<button
														onClick={() => {
															removeCartItemMutation.mutate(item.id);
															setRemoveOne(true);
														}}
														className="rounded px-2 py-1 text-white"
													>
														<MinusIcon
															className="rounded-lg border text-black"
															size={20}
														/>
													</button>
													<span className="text-lg font-semibold">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															addToCartMutation.mutate(item)
														}
														className="rounded px-2 py-1 text-white"
													>
														<PlusIcon
															className="rounded-lg border text-black"
															size={20}
														/>
													</button>
												</div>
											</div>
										</div>

										<div className="flex h-full flex-col items-end justify-between">
											<button
												onClick={() => {
													removeCartItemMutation.mutate(item.id);
													setRemoveOne(false);
												}}
												className="text-center font-semibold text-gray-500 hover:text-red-500"
											>
												<img
													src={crossLogo}
													alt=""
													className="size-8 rounded-lg border object-cover object-top"
												/>
											</button>
											<p className="text-lg font-semibold text-gray-800">
												SUBTOTAL: ₹{item.product.new_price * item.quantity}
											</p>
										</div>
									</div>
								))}
							</div>
							<div className="h-min w-full rounded-lg bg-gray-50 p-6 shadow-lg">
								<div>
									<h2 className="mb-4 text-xl font-bold text-gray-800">
										Summary
									</h2>
									<hr className="mb-4" />
									<div className="mb-2 flex justify-between text-lg font-medium">
										<p>Subtotal</p>
										<p>₹{formattedTotalPrice}</p>
									</div>
									<div className="mb-4 flex justify-between text-lg font-medium">
										<p>Shipping</p>
										<p>₹80.00</p>
									</div>
									<hr className="mb-4" />
									<div className="flex justify-between text-xl font-bold">
										<p>Total</p>
										<p>₹{formattedTotalPrice + 80}</p>
									</div>
								</div>
								<div className="mt-56">
									<button
										onClick={() => handleCartCheckout()}
										className="mt-6 w-full rounded-lg bg-black py-3 text-white hover:bg-gray-800"
									>
										Checkout
									</button>
									<button
										onClick={() => clearCartMutation.mutate()}
										className="mt-4 w-full rounded-lg bg-red-500 py-3 text-white hover:bg-red-600"
									>
										Clear Cart
									</button>
									<button
										onClick={() => navigate("/shop/men")}
										className="mt-4 w-full rounded-lg py-2 text-black ring-2 ring-black hover:bg-gray-300/20"
									>
										Continue Shopping
									</button>
									<ProfileModal
										isOpen={isModalOpen}
										onClose={() => setIsModalOpen(false)}
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
export default CartPage;
