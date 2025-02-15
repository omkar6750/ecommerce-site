import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import heroImage from "@/assets/Frontend_Assets/totebag_hero.webp";

const Hero = () => {
	return (
		<div className="relative flex h-screen w-screen items-center justify-center bg-gradient-to-bl from-[#fde1ff] to-[#e1ffea22]">
			<img src={heroImage} alt="" className="h-full w-full object-cover" />
			<div className="absolute flex flex-1 -translate-x-2/3 -translate-y-1/4 flex-col justify-center gap-[20px] leading-tight">
				<h2 className="text-2xl font-semibold text-slate-900">NEW ARRIVALS ONLY</h2>
				<div>
					<div className="flex items-center gap-5">
						<p className="text-8xl font-bold text-slate-900">New</p>
					</div>
					<p className="text-8xl font-bold text-slate-900">collections</p>
					<p className="text-8xl font-bold text-slate-900">for everyone</p>
				</div>
				<div>
					<Button className="flex h-16 w-96 items-center justify-center gap-4 rounded-full bg-red-600 text-xl font-semibold text-white hover:bg-red-500">
						Latest Collection
					</Button>
					<img src={ArrowRightIcon} alt="" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
