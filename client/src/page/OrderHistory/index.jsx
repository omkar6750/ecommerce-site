import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";

const UserOrders = () => {
	const getUserOrders = async () => {
		const response = await apiClient.get("/api/orders/user", { withCredentials: true });
		if (response.status === 200) {
			return response.data;
		}
	};
	const {
		data: ordersData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["userOrders"],
		queryFn: getUserOrders,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return <div className="p-6 text-center">Loading orders...</div>;
	if (error) return <div className="p-6 text-center">Error loading orders.</div>;

	const orders = ordersData || [];

	const currentOrder = orders.find((order) => {
		const status = order.order_status.toLowerCase();
		return status === "pending" || status === "shipped";
	});

	const historyOrders = orders.filter((order) => order !== currentOrder);

	return (
		<div className="container mx-auto p-6">
			<h1 className="mb-6 text-3xl font-bold">My Orders</h1>

			{currentOrder ? (
				<div className="mb-10">
					<h2 className="mb-4 text-2xl font-semibold">Current Order</h2>
					<OrderCard order={currentOrder} />
				</div>
			) : (
				<p className="mb-10 text-gray-600">No current order available.</p>
			)}

			<div>
				<h2 className="mb-4 text-2xl font-semibold">Order History</h2>
				{historyOrders.length > 0 ? (
					historyOrders.map((order) => <OrderCard key={order.order_id} order={order} />)
				) : (
					<p className="text-gray-600">No previous orders found.</p>
				)}
			</div>
		</div>
	);
};

const OrderCard = ({ order }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const orderDate = new Date(order.created_at);
	const today = new Date();
	const diffDays = (today - orderDate) / (1000 * 60 * 60 * 24);
	const returnEligible = diffDays <= 7;

	return (
		<div className="mb-6 rounded-lg border bg-white p-4 shadow-lg">
			<div className="flex items-center justify-between">
				<div>
					<p className="font-semibold">Order ID: {order.order_id}</p>
					<p>Order Value:₹{order.order_value.toFixed(2)}</p>
					<p>
						Status: <span className="font-medium">{order.order_status}</span>
					</p>
					<p>
						Created:{" "}
						{new Date(order.created_at).toLocaleDateString("en-US", {
							weekday: "long",
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					</p>
				</div>
				<button
					onClick={() => setIsExpanded((prev) => !prev)}
					className="text-blue-600 hover:underline"
				>
					{isExpanded ? "Hide Details" : "Show Details"}
				</button>
			</div>
			{isExpanded && (
				<div className="mt-4 border-t pt-4">
					<h3 className="mb-2 font-semibold">Order Items:</h3>
					<ul className="mb-4 space-y-1 text-sm">
						{order.order_items.map((item, idx) => (
							<li key={idx}>
								{item.name} - {item.quantity} x ₹{item.new_price.toFixed(2)}
							</li>
						))}
					</ul>
					<div className="flex gap-4">
						{returnEligible && (
							<button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
								Return
							</button>
						)}
						<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
							Replace
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserOrders;
