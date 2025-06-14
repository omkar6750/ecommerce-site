import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductTable from "@/components/ProductTable";
import { deleteProduct, fetchProducts, updateProduct } from "@/productApi";
import { toast } from "sonner";

const EditProduct = () => {
	const [page, setPage] = useState(1);

	const queryClient = useQueryClient();

	const {
		data: products,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products", page],
		queryFn: () => fetchProducts(page),
	});

	const mutation = useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});

	const updateData = (rowData, columnId, value) => {
		const updatedProduct = { ...rowData, [columnId]: value };
		mutation.mutate(updatedProduct);
	};

	const deleteMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			toast.success("Product deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (err) => {
			toast.error("Error deleting product");
			console.error(err);
		},
	});

	const handleDeleteProduct = (productId) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			deleteMutation.mutate(productId);
		}
	};
	const product_data = products && products;
	const meta = products && products.meta;

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading products</div>;

	return (
		<div className="p-8">
			<h1 className="mb-4 text-2xl font-bold">Product Table</h1>
			<ProductTable
				data={products}
				updateData={updateData}
				onDeleteProduct={handleDeleteProduct}
			/>
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

export default EditProduct;
