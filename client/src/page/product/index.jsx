import React, { useEffect, useState } from "react";
import { useAppStore } from "@/Store";
import { useLocation } from "react-router-dom";
import { HOST } from "@/Utils/constants";
import { ArrowLeftRight, BanknoteIcon, Truck } from "lucide-react";
import { toast } from "sonner";

const ProductCard = () => {
	const location = useLocation();
	const { addToCart, cart } = useAppStore((state) => state);
	const { product } = location.state || {};
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedProduct, setSelectedProduct] = useState();

	useEffect(() => {
		setSelectedProduct(product);
	}, []);
	console.log(cart);
	const handleAddToCart = () => {
		addToCart(selectedProduct);
		toast.success("Added to cart successfully");
	};

	const futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + 3);
	const formattedDate = futureDate.toLocaleDateString("en-US", {
		weekday: "long",
		day: "numeric",
	});

	const testSize = "M,L,XL,XXl";

	const sizeArray = testSize.split(",").map((size) => size.trim());

	if (!product) {
		return <div>No product data available.</div>;
	}

	return (
		<div className="container mx-auto flex flex-col gap-8 space-x-12 p-20 md:flex-row">
			<div className="flex items-center justify-center md:w-1/2">
				<div className="">
					<div className="m-5 h-[420px] w-[330px] overflow-hidden rounded-lg md:h-[480px] md:w-[370px] lg:h-[550px] lg:w-[400px]">
						<img
							src={`${HOST}/uploads/${product.product_image}`}
							className="h-full w-full rounded-md object-cover"
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-start md:w-2/5">
				<h1 className="mb-4 text-4xl font-bold text-slate-800/90">{product.name}</h1>
				<p className="mb-4 text-lg text-gray-600">{product.description}</p>

				<div className="mb-4">
					<span className="mr-4 text-2xl font-semibold">₹{product.new_price}</span>
					{product.old_price && product.new_price < product.old_price && (
						<>
							<span className="text-lg text-gray-500 line-through">
								₹{product.old_price}
							</span>
							<p className="text font-bold text-red-500">
								{`(${Math.round(((product.old_price - product.new_price) / product.old_price) * 100)}% OFF)`}
							</p>
						</>
					)}
					<p className="text-green-600">inclusive of all taxes</p>
				</div>
				<div className="text-lg font-semibold">Select Size:</div>
				<div className="mb-2">
					<ul className="flex space-x-4">
						{sizeArray.map((size, index) => (
							<li
								key={index}
								onClick={(e) => {
									setSelectedProduct({ ...selectedProduct, size: size });
									setSelectedSize(size);
								}}
								className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border text-2xl ${selectedSize === size ? "bg-accent" : ""} `}
							>
								{size}
							</li>
						))}
					</ul>
				</div>
				<div className="mb-2">
					<strong>Tags:</strong> {product.tags}
				</div>
				<div className="mb-2">
					<strong>Colour:</strong> {product.colour}
				</div>
				<div className="mb-2">
					<strong>Gender:</strong> {product.gender}
				</div>

				<button
					onClick={handleAddToCart}
					className="mt-6 rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
				>
					Add to Cart
				</button>
				<div className="flex gap-5 pb-2 pt-11">
					<ArrowLeftRight /> <p>Easy 7 day return/exchange available</p>
				</div>
				<div className="flex gap-5 pb-2">
					<BanknoteIcon /> <p>Cash on delivery Not available</p>
				</div>
				<div className="flex gap-5">
					<Truck />
					<div className="flex">
						<p>Get it by</p> <p className="px-2 font-medium">{formattedDate}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
