import React from "react";
import footer_logo from "../assets/Frontend_Assets/logo/logo_big.png";
import instagram_icon from "../assets/Frontend_Assets/logo/instagram_icon.png";
import pinterest_icon from "../assets/Frontend_Assets/logo/pinterest_icon.png";
import whatsapp_icon from "../assets/Frontend_Assets/logo/whatsapp_icon.png";

const Footer = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-12">
			<div className="flex items-center gap-5">
				<p className="text-5xl font-semibold text-slate-800">AEON</p>
			</div>
			<ul className="flex list-none gap-12 text-xl text-slate-800">
				<li className="flex gap-5">Company</li>
				<li className="flex gap-5">Products</li>
				<li className="flex gap-5">Offices</li>
				<li className="flex gap-5">About</li>
				<li className="flex gap-5">Contact</li>
			</ul>
			<div className="flex gap-5">
				<div className="rounded-md border-[1px] border-solid border-[#ebebeb] bg-[#fbfbfb] p-3 pb-2">
					<img src={instagram_icon} alt="" />
				</div>
				<div className="rounded-md border-[1px] border-solid border-[#ebebeb] bg-[#fbfbfb] p-3 pb-2">
					<img src={pinterest_icon} alt="" />
				</div>
				<div className="rounded-md border-[1px] border-solid border-[#ebebeb] bg-[#fbfbfb] p-3 pb-2">
					<img src={whatsapp_icon} alt="" />
				</div>
			</div>
			<div>
				<hr />
				<p>Copyright @ 2025 -All rights reserved</p>
			</div>
		</div>
	);
};

export default Footer;
