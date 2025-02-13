import React, { useState } from "react";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/Store";
import AEON_logo_1 from "@/assets/Frontend_Assets/aeon_logo_1.png";
import AEON_logo_2 from "@/assets/Frontend_Assets/aeon_logo_2.png";
import AEON_logo_3 from "@/assets/Frontend_Assets/aeon_logo_3.png";

function Navbar() {
	const { cart } = useAppStore();
	const location = useLocation();
	const menu = location.pathname;

	return (
		<nav className="fixed left-0 top-0 z-20 flex w-full justify-around bg-transparent bg-gradient-to-b from-black/35 to-transparent p-2">
			<div className="flex items-center">
				<img src={AEON_logo_1} alt="" className="h-11 w-72 object-cover object-center" />
				{/* <p className="px-2 font-serif text-4xl font-semibold text-black">
          AEON
        </p> */}
			</div>
			<ul className="flex w-1/5 list-none items-center justify-around">
				{[
					["HOME", "/"],
					["MEN", "/mens"],
					["WOMEN", "/womens"],
					["KIDS", "/kids"],
				].map(([title, url]) => (
					<li
						key={title}
						className="flex cursor-pointer flex-col items-center justify-center text-2xl font-semibold text-white"
					>
						<a
							href={url}
							className="text-shadow-sm rounded-lg px-3 py-2 font-semibold text-white"
						>
							{title}
						</a>
						{menu === `${url}` ? (
							<hr className="h-[2px] w-16 rounded-full bg-white" />
						) : (
							<></>
						)}
					</li>
				))}
			</ul>
			<div className="flex items-center justify-center gap-5">
				<Link to={"/auth"}>
					<CircleUserRound size={30} className="font-extralight text-white" />
				</Link>
				<Link to={"/cart"}>
					<ShoppingCart className="cursor-pointer text-white" size={30} />
				</Link>
				<div className="bg-Maroon -ml-7 mb-8 h-5 w-5 rounded-full text-center text-sm text-white">
					{cart.length}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
