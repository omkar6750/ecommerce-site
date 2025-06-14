import React, { useEffect, useState } from "react";
import { useAppStore } from "@/Store";
import { Link, useLocation } from "react-router-dom";
import { HOST } from "@/Utils/constants";
import { ArrowLeftRight, BanknoteIcon, ShoppingCart, Truck } from "lucide-react";
import { toast } from "sonner";
import AddToCartButton from "@/components/AddToCartButton";
import { addToCart } from "@/cartApi";

const ProductCard = () => {
	const location = useLocation();
	const { product } = location.state || {};
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState();
	const [selectedColor, setSelectedColor] = useState(null);
	const isElectronics = product.tags.some((tag) => tag === "ELE");
	const [selectedVariant, setSelectedVariant] = useState(null);
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		if (selectedSize && selectedColor) {
			const variant = selectedProduct.variants.find(
				(v) => v.size === selectedSize && v.color === selectedColor
			);
			setSelectedVariant(variant || null);
		}
	}, [selectedSize, selectedColor]);

	useEffect(() => {
		setSelectedProduct(product);
	}, []);

	const handleAddToCart = async () => {
		if (selectedColor && selectedSize) {
			try {
				console.log(selectedProduct.product_id, 1, selectedVariant.sku);
				const response = await addToCart(
					selectedProduct.product_id,
					1,
					selectedVariant.sku
				);
			} catch (error) {
				toast.error("Failed to add to cart");
			}
			toast.success("Added to cart successfully");
		} else {
			toast.error("select color and size first");
		}
	};

	const futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + 3);
	const formattedDate = futureDate.toLocaleDateString("en-US", {
		weekday: "long",
		day: "numeric",
	});

	const SizeColorSelector = () => {
		const data = product.variants;

		const availableSizes = [...new Set(data.map((item) => item.size))];
		const availableColors = [...new Set(data.map((item) => item.color))];

		const sizesForColor = selectedColor
			? [
					...new Set(
						data
							.filter(
								(item) => item.color === selectedColor && item.inventory_count > 0
							)
							.map((item) => item.size)
					),
				]
			: availableSizes;

		const colorsForSize = selectedSize
			? [
					...new Set(
						data
							.filter(
								(item) => item.size === selectedSize && item.inventory_count > 0
							)
							.map((item) => item.color)
					),
				]
			: availableColors;

		return (
			<div>
				<h3 className="font-semibold">Select Size:</h3>
				{availableSizes.map((size) => (
					<button
						key={size}
						disabled={!sizesForColor.includes(size)}
						onClick={() => setSelectedSize(size)}
						className={`m-2 size-12 rounded-full border ${selectedSize === size ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
					>
						{size}
					</button>
				))}

				<h3 className="font-semibold">Select Color:</h3>
				{availableColors.map((color) => (
					<button
						key={color}
						disabled={!colorsForSize.includes(color)}
						onClick={() => setSelectedColor(color)}
						className={`m-2 size-12 rounded-full border bg-${color.toLowerCase()}${["black", "white"].includes(color.toLowerCase()) ? "" : "-600"} ${selectedColor === color ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
					></button>
				))}
			</div>
		);
	};

	if (!product) {
		return <div>No product data available.</div>;
	}

	return (
		<div className="relative mx-auto flex items-center justify-center gap-8 space-x-12 p-20 md:flex-row">
			<div className="absolute right-5 top-5">
				<Link to={"/cart"}>
					<ShoppingCart className="cursor-pointer" size={30} />
				</Link>
			</div>
			<div className="flex items-center justify-center md:w-1/2">
				<div>
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
				{isElectronics ? null : (
					<div>
						<SizeColorSelector />
						<div className="mb-2">
							<strong>Gender:</strong> {product.gender.toUpperCase()}
						</div>
					</div>
				)}

				<AddToCartButton handleAddToCart={handleAddToCart} />

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
