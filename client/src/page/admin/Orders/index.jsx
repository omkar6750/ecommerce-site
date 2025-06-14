import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "@/productApi";
import { toast } from "sonner";
import OrderTable from "@/components/OrdersTable";

const OrderDashboard = () => {
	const [page, setPage] = useState(1);

	const queryClient = useQueryClient();

	const {
		data: orders,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["orders", page],
		queryFn: () => getOrders(page),
	});

	const mutation = useMutation({
		mutationFn: ({ orderId, order_status }) => updateOrderStatus(order_status, orderId),
		onSuccess: () => {
			toast.success("Order status updated");
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
		onError: () => {
			toast.error("Failed to update order status");
		},
	});

	const updateData = (rowData, columnId, value) => {
		if (columnId === "order_status") {
			mutation.mutate({ orderId: rowData.order_id, order_status: value });
		}
	};

	const meta = orders?.meta || { currentPage: 1, totalPages: 1 };

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading orders</div>;

	return (
		<div className="p-8">
			<h1 className="mb-4 text-2xl font-bold">Orders</h1>
			<OrderTable data={orders} updateData={updateData} />
			<div className="mt-4 flex items-center justify-between">
				<button
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
					className="rounded border px-4 py-2 disabled:opacity-50"
				>
					Previous
				</button>
				<span>
					Page {meta.currentPage} of {meta.totalPages}
				</span>
				<button
					onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
					disabled={page === meta.totalPages}
					className="rounded border px-4 py-2 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default OrderDashboard;
