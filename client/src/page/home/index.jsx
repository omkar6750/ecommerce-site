import Hero from "@/components/Hero";
import NewCollections from "@/components/NewCollections";
import Offers from "@/components/Offers";
import Popular from "@/components/Popular";
import apiClient from "@/lib/apiClient";
import { FETCH_PRODUCTS } from "@/Utils/constants";
import React, { useEffect, useState } from "react";

function Shop() {
	const [newCollection, setNewCollection] = useState([]);
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		const fetchNewCollection = async () => {
			const response = await apiClient.post(
				`/api/products?page=1`,
				{ filters: { sort: "newest" } },
				{
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				}
			);
			setNewCollection(response.data.data);
		};

		fetchNewCollection();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await apiClient.post(
				`${FETCH_PRODUCTS}?page=1&per_page=4`,
				{ filters: { sort: "newest", gender: "female" } },
				{ withCredentials: true, headers: { "Content-Type": "application/json" } }
			);
			setPopular(response.data.data);
		};
		fetchProducts();
	}, []);

	return (
		<div className="overflow-hidden">
			<div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<Hero />
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<NewCollections newCollection={newCollection} />
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<Popular popular={popular} />
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<Offers />
				</section>
			</div>
		</div>
	);
}

export default Shop;
