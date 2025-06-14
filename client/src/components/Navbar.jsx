import React, { useEffect, useState } from "react";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/Store";
import AEON_logo_1 from "@/assets/Frontend_Assets/aeon-logo-black-and-white.png";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import apiClient from "@/lib/apiClient";
import { LOGOUT_ROUTE } from "@/Utils/constants";
import { toast } from "sonner";
import ProfileModal from "./ProfileModal";

function Navbar() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { cart, userInfo, fetchCart } = useAppStore();
	const location = useLocation();
	const menu = location.pathname;
	const [scrolled, setScrolled] = useState(false);
	const homeURLs = [
		["HOME", "/"],
		["MEN", "/men"],
		["WOMEN", "/women"],
		["KIDS", "/kids"],
		["ELECTRONICS", "/electronics"],
	];
	const shopURLs = [
		["MEN", "/shop/men"],
		["WOMEN", "/shop/women"],
		["KIDS", "/shop/kids"],
		["ELECTRONICS", "/shop/electronics"],
	];
	const URLresolver = window.location.pathname.split("/").filter(Boolean).includes("shop");

	const handleLogout = () => {
		const response = apiClient.post(LOGOUT_ROUTE, { withCredentials: true });
		if (response.status === 200) {
			toast("logout successfull");
		}
	};
	useEffect(() => {
		fetchCart();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed left-0 top-0 z-20 flex h-24 w-full justify-around p-2 ${scrolled ? "bg-white shadow-md" : "bg-transparent bg-gradient-to-b from-black/10 to-transparent"} `}
		>
			<ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			<Link to={"/"}>
				<div className="flex items-center">
					<img
						src={AEON_logo_1}
						alt=""
						className="h-11 w-36 object-cover object-center"
					/>
				</div>
			</Link>
			<ul className="flex w-1/5 list-none items-center justify-around">
				{(URLresolver ? shopURLs : homeURLs).map(([title, url]) => (
					<li
						key={title}
						className="flex cursor-pointer flex-col items-center justify-center text-2xl font-semibold text-white"
					>
						<a href={url} className="rounded-lg px-3 py-2 font-semibold text-black">
							{title}
						</a>
						{menu.endsWith(url) ? (
							<div className="h-[2px] w-16 rounded-full bg-black" />
						) : (
							<div></div>
						)}
					</li>
				))}
			</ul>
			<div className="flex items-center justify-center gap-5">
				<Menubar className="border-none bg-transparent">
					<MenubarMenu className="">
						<MenubarTrigger className="m-0 bg-transparent p-0">
							<CircleUserRound size={30} className="font-extralight" />
						</MenubarTrigger>
						<MenubarContent>
							<Link to={"/auth"}>
								<MenubarItem className="text-lg">Login/SignUp</MenubarItem>
							</Link>
							<div>
								<button
									onClick={() =>
										userInfo.email === ""
											? navigate("/auth")
											: setIsModalOpen(true)
									}
								>
									<MenubarItem className="text-lg">Profile</MenubarItem>
								</button>
							</div>
							<div>
								<button
									onClick={() =>
										userInfo.email === ""
											? toast.error("You aren't logged in")
											: handleLogout()
									}
								>
									<MenubarItem className="text-lg">Logout</MenubarItem>
								</button>
							</div>
							{
								<Link to={"/orders"}>
									<button>
										<MenubarItem className="text-lg">Orders</MenubarItem>
									</button>
								</Link>
							}
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
				<Link to={"/cart"}>
					<ShoppingCart className="cursor-pointer" size={30} />
				</Link>
				{cart.length != 0 ? (
					<div className="-ml-7 mb-8 h-5 w-5 rounded-full bg-black text-center text-sm text-white">
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
