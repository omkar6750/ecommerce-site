import React, { useEffect, useState } from "react";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/Store";
import AEON_logo_1 from "@/assets/Frontend_Assets/aeon-logo-black-and-white.png";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarShortcut,
	MenubarTrigger,
} from "./ui/menubar";

function Navbar() {
	const { cart } = useAppStore();
	const location = useLocation();
	const menu = location.pathname;
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Check if window scroll is past 50px
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		// Add the scroll event listener
		window.addEventListener("scroll", handleScroll);
		// Clean up the event listener on unmount
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed left-0 top-0 z-20 flex h-24 w-full justify-around p-2 ${scrolled ? "bg-white shadow-md" : "bg-transparent bg-gradient-to-b from-black/10 to-transparent"} `}
		>
			<div className="flex items-center">
				<img src={AEON_logo_1} alt="" className="h-11 w-36 object-cover object-center" />
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
						<a href={url} className="rounded-lg px-3 py-2 font-semibold text-black">
							{title}
						</a>
						{menu === `${url}` ? (
							<hr className="h-[2px] w-16 rounded-full bg-black" />
						) : (
							<></>
						)}
					</li>
				))}
			</ul>
			<div className="flex items-center justify-center gap-5">
				<Menubar className="border-none bg-transparent">
					<MenubarMenu>
						<MenubarTrigger className="bg-inherit">
							<CircleUserRound size={30} className="font-extralight" />
						</MenubarTrigger>
						<MenubarContent>
							<Link to={"/auth"}>
								<MenubarItem className="text-lg">Login/SignUp</MenubarItem>
							</Link>
							<Link to={"/profile"}>
								<MenubarItem className="text-lg">Profile</MenubarItem>
							</Link>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
				<Link to={"/cart"}>
					<ShoppingCart className="cursor-pointer" size={30} />
				</Link>
				{cart.length != 0 ? (
					<div className="-ml-7 mb-8 h-5 w-5 rounded-full bg-red-500 text-center text-sm text-white">
						{cart.length}
					</div>
				) : (
					<div></div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
