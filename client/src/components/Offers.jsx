import React from "react";
import { Button } from "./ui/button";
import offersImage from "@/assets/Frontend_Assets/offers-image.png";
import { Link } from "react-router-dom";

const Offers = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="relative flex h-5/6 w-4/5 items-center justify-center border">
				<img src={offersImage} alt="" className="h-full w-full object-cover" />
				<div className="absolute flex -translate-x-[400px] translate-y-40 flex-col items-start justify-center">
					<h1 className="mb-3 text-7xl font-semibold text-slate-900 text-shadow-sm">
						EXCLUSIVE
					</h1>
					<h1 className="mb-8 text-5xl font-bold text-slate-800">OFFERS FOR YOU</h1>
					<p className="text-3xl font-semibold">Only on bestseller product's</p>
					<Link to={`/shop/men`}>
						<Button className="flex h-16 w-96 items-center justify-center gap-4 rounded-full border-2 border-red-300 border-y-rose-300 bg-red-600 text-xl font-semibold text-white shadow-2xl hover:bg-red-500">
							Check Now
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Offers;
