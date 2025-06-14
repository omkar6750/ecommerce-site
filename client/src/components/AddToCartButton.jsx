import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckIcon, ShoppingCart, TicketCheckIcon } from "lucide-react";

const AddToCartButton = ({ handleAddToCart }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleClick = async () => {
		setIsClicked(true);

		await handleAddToCart();
		setTimeout(() => setIsClicked(false), 1500); // Reset after animation
	};
	return (
		<div className="flex w-full items-center justify-center">
			<motion.button
				className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-blue-500 px-4 py-3 font-semibold text-black shadow-md hover:bg-blue-600"
				onClick={() => {
					handleClick();
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				whileHover={{ scale: 1.01 }}
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
					className="relative z-10 flex items-center gap-7 text-2xl font-medium text-white"
					initial={{ x: 0 }}
					animate={isClicked ? { x: 40, opacity: 0 } : { x: 0, opacity: 1 }}
					transition={{ duration: 0.4, ease: "easeInOut" }}
				>
					Add to Cart
					<motion.span
						className="text-white"
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
