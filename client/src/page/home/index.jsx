import Hero from "@/components/Hero";
import NewCollections from "@/components/NewCollections";
import Offers from "@/components/Offers";
import Popular from "@/components/Popular";
import apiClient from "@/lib/apiClient";
import { FETCH_PRODUCTS } from "@/Utils/constants";
import React, { useEffect, useState } from "react";

function Shop() {
	const [newCollection, setNewCollection] = useState([]);
	const [offers, setOffers] = useState([]);
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		const fetchNewCollection = async () => {
			// Sending sort: newest and page=1 (per_page defaults to 10 on backend)
			const response = await apiClient.post(
				`/api/products?page=1`,
				{ filters: { sort: "newest" } },
				{
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				}
			);
			console.log(response.data.data);
			setNewCollection(response.data.data);

			// console.error("Error fetching new collection:", error);
			// toast.error("Failed to fetch New Collections");
		};

		fetchNewCollection();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await apiClient.post(
				`${FETCH_PRODUCTS}?page=1&per_page=10`,
				{ filters: { sort: "random" } },
				{ withCredentials: true, headers: { "Content-Type": "application/json" } }
			);
			setPopular(response.data.data);
		};
		fetchProducts();
	}, []);

	// useEffect(() => {
	// 	const fetchPopular = async () => {
	// 		try {
	// 			const response = await apiClient.post(
	// 				`${FETCH_PRODUCTS}?page=1&per_page=5`,
	// 				{ filters: { sort: "random" } },
	// 				{
	// 					withCredentials: true,
	// 					headers: { "Content-Type": "application/json" },
	// 				}
	// 			);
	// 			setPopular(response.data.data);
	// 		} catch (error) {
	// 			console.error("Error fetching popular products:", error);
	// 		}
	// 	};

	// 	fetchPopular();
	// }, []);

	return (
		<div className="flex h-screen w-screen flex-col overflow-y-scroll scroll-smooth">
			<section>
				<Hero />
			</section>
			<section>
				<Popular popular={popular} />
			</section>
			<section>
				<Offers />
			</section>
			<section>
				<NewCollections newCollection={newCollection} />
			</section>
		</div>
	);
}

export default Shop;
