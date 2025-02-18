import React, { useState, useEffect } from "react";
import { data, Link, useLocation, useNavigate, useParams } from "react-router-dom"; // For navigation to the product detail page
import Item from "@/components/Item";
import apiClient from "@/lib/apiClient";
import { FETCH_PRODUCTS, HOST } from "@/Utils/constants";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const ShopCategory = ({ category }) => {
	const navigate = useNavigate();
	const { page } = useParams();
	const currentPage = page ? parseInt(page, 10) : 1;
	const [product, setProduct] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [gender, setGender] = useState();
	const [lastPage, setLastPage] = useState();

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await apiClient.post(
				`${FETCH_PRODUCTS}?page=${currentPage}&per_page=9`,
				{ filters: { sort: "newest", gender: category } },
				{ withCredentials: true, headers: { "Content-Type": "application/json" } }
			);
			setProduct(response.data.data);
			console.log(response.data);
			setLastPage(response.data.meta.totalPages);
			setGender(category === "male" ? "men" : category === "female" ? "women" : "kids");
		};
		fetchProducts();
	}, [currentPage]);
	if (!product) {
		return <div>No product data availeble</div>;
	}

	return (
		<div className="flex h-full w-full flex-col items-center gap-3 overflow-hidden bg-[#F1F0E8]">
			<div className="flex flex-col items-center justify-center">
				<h1 className="mt-32 text-5xl font-semibold text-slate-900">Shop </h1>
				<hr className="mt-5 h-1 w-52 rounded-xl bg-[#252525]" />
				<div className="mt-20 grid grid-cols-3 justify-center gap-y-16">
					{product.map((item, i) => (
						<Link to={`/product/${item.product_id}`} key={i} state={{ product: item }}>
							<Item
								id={item.product_id}
								image={item.product_image}
								name={item.name}
								old_price={item.old_price}
								new_price={item.new_price}
							/>
						</Link>
					))}
				</div>
				<div className="my-10 flex items-center justify-center">
					<button
						onClick={() => {
							navigate(`/shop/${gender}/${Math.max(currentPage - 1)}`);
							window.scrollTo(0, 0);
						}}
						disabled={currentPage === 1}
					>
						<ChevronLeftIcon />
					</button>
					<p className={`m-4 text-2xl ${currentPage === 1 ? "hidden" : ""}`}>...</p>
					<div className="w-8 border-2 border-slate-600 text-center text-2xl">
						{currentPage}
					</div>
					<p className={`m-4 text-2xl ${currentPage === lastPage ? "hidden" : ""}`}>
						...
					</p>

					<button
						onClick={() => {
							navigate(`/shop/${gender}/${currentPage + 1}`);
							window.scrollTo(0, 0);
						}}
						disabled={currentPage === lastPage}
						className="disabled:text-gray-700"
					>
						<ChevronRightIcon />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShopCategory;
