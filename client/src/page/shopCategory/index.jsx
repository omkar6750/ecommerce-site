import React, { useState, useEffect } from "react";
import { data, Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import tags from "@/Utils/tags.json";
import { getCart } from "@/cartApi";

const ShopCategory = ({ category }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { page } = useParams();
	const currentPage = page ? parseInt(page, 10) : 1;
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [gender, setGender] = useState();
	const [lastPage, setLastPage] = useState();
	const { filter } = location.state || {};
	const selectedTag = tags.find((tag) => tag.label === filter);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await apiClient.post(
				`${FETCH_PRODUCTS}?page=${currentPage}&per_page=9`,
				{ filters: { sort: "newest", gender: category } },
				{ withCredentials: true, headers: { "Content-Type": "application/json" } }
			);
			const featuredTags = filter;
			setProducts(response.data.data);
			setLastPage(response.data.meta.totalPages);
			setGender(category === "male" ? "men" : category === "female" ? "women" : "kids");
		};

		const fetchFeaturedProducts = async () => {
			const response = await apiClient.post(
				`${FETCH_PRODUCTS}?per_page=30`,
				{ filters: { sort: "newest", gender: category } },
				{ withCredentials: true, headers: { "Content-Type": "application/json" } }
			);
			const featuredProducts = response.data.data;
			const featured = featuredProducts
				.filter((product) => product.tags?.includes(filter))
				.slice(0, 4);
			setFilteredProducts(featured);
		};
		if (currentPage === 1 && filter) {
			fetchFeaturedProducts();
		}
		fetchProducts();
	}, [currentPage]);
	if (!products) {
		return <div>No product data availeble</div>;
	}

	return (
		<div className="flex h-full w-full flex-col items-center gap-3 overflow-hidden bg-white">
			<div className="flex flex-col items-center justify-center">
				<h1 className="mt-32 text-5xl font-semibold text-slate-900">Shop </h1>
				<hr className="mt-5 h-1 w-52 rounded-xl bg-[#252525]" />
				{currentPage === 1 && filteredProducts.length > 0 && (
					<div className="mt-20">
						<h2 className="text-4xl font-medium">{`${selectedTag.name}'s`}</h2>
						<div
							className={`mt-10 grid grid-cols-${filteredProducts.length > 4 ? 4 : filteredProducts.length} justify-center gap-y-16 space-x-6 border p-10`}
						>
							{filteredProducts.map((item, i) => (
								<Item key={i} product={item} />
							))}
						</div>
					</div>
				)}

				<div className="mt-20 grid grid-cols-3 justify-center gap-y-16">
					{products.map((item, i) => (
						<Item key={i} product={item} />
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
							setFilteredProducts([]);
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
