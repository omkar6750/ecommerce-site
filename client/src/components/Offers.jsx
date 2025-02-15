import React from "react";
import { Button } from "./ui/button";
import offersImage from "@/assets/Frontend_Assets/empty_box_hero.webp";

const Offers = () => {
	return (
		<div className="flex h-[100vh] w-screen items-center justify-center px-0 pb-36">
			<div className="relative flex h-[60vh] w-4/5 items-center justify-center pl-40">
				<img src={offersImage} alt="" className="absolute h-[80vh] w-full" />
				<div className="absolute flex flex-col items-center justify-center">
					<h1 className="mb-4 text-7xl font-semibold text-slate-900">EXCLUSIVE</h1>
					<h1 className="mb-6 text-5xl font-bold text-slate-800">OFFERS FOR YOU</h1>
					<p className="text-2xl font-semibold">Only on bestseller product's</p>
					<Button className="mt-8 h-20 w-72 cursor-pointer rounded-full border-none bg-red-600 text-2xl font-medium text-white">
						Check Now
					</Button>
				</div>
				<div className="flex flex-1 items-center justify-end pt-12">
					{/* <img src={exclusive_image} alt="" className='h-[60vh]' /> */}
				</div>
			</div>
		</div>
	);
};

export default Offers;
