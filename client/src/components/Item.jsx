import { HOST } from "@/Utils/constants";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppStore } from "@/Store";
import { data, Link } from "react-router-dom";
import { addToCart } from "@/cartApi";
import { toast } from "sonner";
import AddToCartButton from "./AddToCartButton";

const Item = (data) => {
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedVariant, setSelectedVariant] = useState(null);

	const props = data.product;

	useEffect(() => {
		if (selectedSize && selectedColor) {
			const variant = props.variants.find(
				(v) => v.size === selectedSize && v.color === selectedColor
			);
			setSelectedVariant(variant || null);
		}
	}, [selectedSize, selectedColor]);

	const SizeColorSelector = () => {
		const data = props.variants;

		const availableSizes = [...new Set(data.map((item) => item.size))];
		const availableColors = [...new Set(data.map((item) => item.color))];

		useEffect(() => {
			setSelectedColor(availableColors[0]);
		}, [availableColors]);

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
				<div>
					{availableSizes.map((size) => (
						<button
							key={size}
							disabled={!sizesForColor.includes(size)}
							onClick={() => setSelectedSize(size)}
							className={`m-2 size-8 rounded-full border uppercase ${selectedSize === size ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
						>
							{size}
						</button>
					))}
				</div>

				<div>
					{availableColors.length > 1 &&
						availableColors.map((color) => (
							<button
								key={color}
								disabled={!colorsForSize.includes(color)}
								onClick={() => setSelectedColor(color)}
								className={`m-2 size-6 rounded-full border bg-${color.toLowerCase()}${["black", "white"].includes(color.toLowerCase()) ? "" : "-600"} ${selectedColor === color ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
							></button>
						))}
				</div>
			</div>
		);
	};

	const handleAddToCart = async () => {
		if (!selectedVariant) {
			toast.error("Please select a size and color");
			return;
		}
		try {
			console.log(props.product_id, 1, selectedVariant.sku);
			const response = await addToCart(props.product_id, 1, selectedVariant.sku);
		} catch (error) {
			toast.error("Failed to add to cart");
		}
	};

	return (
		<div className="w-96 duration-300 hover:-translate-y-3 hover:translate-x-3">
			<Link to={`/product/${props.product_id}`} state={{ product: props }}>
				<img
					src={`${HOST}/uploads/${props.product_image}`}
					alt=""
					className="object-cover"
				/>
			</Link>
			<p>
				{props.gender === "male"
					? "Men"
					: props.gender === "female"
						? "Women"
						: props.gender === "Kids"
							? "Kids"
							: ""}
			</p>
			<Link to={`/product/${props.product_id}`} state={{ product: props }}>
				<p className="mt-3 text-xl font-medium hover:text-gray-700">{props.name}</p>
			</Link>
			<div className="my-5 flex gap-3">
				<div className="text-xl font-semibold text-slate-800">{`Rs. ${props.new_price}`}</div>
				<div className="text-xl font-medium text-slate-800 line-through">
					{props.old_price}
				</div>
			</div>
			<SizeColorSelector />
			<div>
				<Button
					onClick={() => {
						handleAddToCart();
					}}
					className="h-12"
				>
					Add to cart
				</Button>
			</div>
		</div>
	);
};

export default Item;
