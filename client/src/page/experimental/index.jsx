import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckIcon, ShoppingCart, TicketCheckIcon } from "lucide-react";

const AddToCartButton = (onAddToCart, product) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleClick = () => {
		setIsClicked(true);

		onAddToCart(product); // Call mutation function

		setTimeout(() => setIsClicked(false), 1500); // Reset after animation
	};
	return (
		<div className="flex h-screen items-center justify-center">
			<motion.button
				className="relative flex w-56 items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-black shadow-md"
				onClick={handleClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				whileHover={{ scale: 1.05 }}
			>
				{isClicked && (
					<motion.div
						className="absolute inset-0 bg-gray-800"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 4, opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					/>
				)}

				<motion.div
					className="relative z-10 flex items-center gap-2"
					initial={{ x: 0 }}
					animate={isClicked ? { x: 40, opacity: 0 } : { x: 0, opacity: 1 }}
					transition={{ duration: 0.4, ease: "easeInOut" }}
				>
					Add to Cart
					<motion.span
						className="text-black"
						initial={{ opacity: 0, x: -5 }}
						animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
						transition={{ duration: 0.3 }}
					>
						<ArrowRight />
					</motion.span>
				</motion.div>

				{isClicked && (
					<motion.span
						className="absolute flex items-center justify-center gap-2 text-white"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.4 }}
					>
						<p>Added to cart</p>
						<CheckIcon />
					</motion.span>
				)}
			</motion.button>
		</div>
	);
};

export default AddToCartButton;
