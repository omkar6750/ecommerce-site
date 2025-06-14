import React from "react";
import KidsDesk1 from "@/assets/Frontend_Assets/kid_desk_1.jpg";
import KidsDesk2 from "@/assets/Frontend_Assets/kid_desk_2.jpg";
import KidsDesk3 from "@/assets/Frontend_Assets/kid_desk_3.jpg";
import KidsDesk4 from "@/assets/Frontend_Assets/kid_desk_4.mp4";
import KidsDesk5 from "@/assets/Frontend_Assets/kid_desk_5.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const kidsPage = () => {
	return (
		<div className="overflow-hidden">
			<div className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<img
						src={KidsDesk1}
						alt=""
						className="z-0 h-full w-full object-cover object-top"
					/>
					<div className="absolute z-10 w-1/3 -translate-x-[80%] translate-y-[80%] space-y-8">
						<h1 className="text-5xl font-medium text-white">Outdoor Ready</h1>
						<h2 className="text-pretty text-3xl font-normal text-white">
							Shop from our wide range of summer wear
						</h2>
						<Link to={"/shop/kids"} state={{ filter: "SWT" }}>
							<Button className="mt-7 rounded-full bg-white p-8 text-2xl font-medium text-black hover:bg-white/70">
								Shop Now <ChevronRightIcon size={30} />
							</Button>
						</Link>
					</div>
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<img
						src={KidsDesk2}
						alt=""
						className="z-0 h-full w-full object-cover object-top"
					/>
					<div className="absolute z-10 w-1/3 translate-x-[80%] translate-y-[60%] space-y-8">
						<h1 className="text-5xl font-medium text-slate-900">
							Functional Outerwears
						</h1>
						<h2 className="text-pretty text-2xl font-normal text-slate-900">
							High performance pieces for your active lifestyle
						</h2>
						<Link to={"/shop/kids"} state={{ tags: ["SWT"] }}>
							<Button className="mt-7 rounded-full bg-white p-8 text-2xl font-medium text-black hover:bg-white/70">
								Shop Now <ChevronRightIcon size={30} />
							</Button>
						</Link>
					</div>
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<img
						src={KidsDesk3}
						alt=""
						className="z-0 h-full w-full object-cover object-top"
					/>
					<div className="absolute z-10 w-1/3 -translate-x-[80%] translate-y-[60%] space-y-8">
						<h1 className="text-5xl font-medium text-white">
							Get Back To School With Drip
						</h1>
						<h2 className="text-pretty text-2xl font-normal text-white">
							Breeze through this summer in style
						</h2>
					</div>
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<video
						autoPlay
						loop
						src={KidsDesk4}
						className="z-0 h-full w-full object-cover"
					></video>
					<div className="absolute z-10 w-1/3 -translate-y-44 translate-x-[100%] space-y-8">
						<h1 className="text-5xl font-semibold text-white">For Whatever Whenever</h1>
						<h2 className="text-pretty text-2xl font-normal text-white">
							made for your comfort
						</h2>
						<Link to={"/shop/kids"} state={{ tags: ["SWT"] }}>
							<Button className="mt-7 rounded-full bg-white p-8 text-2xl font-medium text-black hover:bg-white/70">
								Shop Now <ChevronRightIcon size={30} />
							</Button>
						</Link>
					</div>
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<img
						src={KidsDesk5}
						alt=""
						className="z-0 h-full w-full object-cover object-top"
					/>
					<div className="absolute z-10 w-1/3 -translate-x-[80%] -translate-y-[70%] space-y-8">
						<h1 className="text-5xl font-medium text-slate-900">
							Denim Collection | Wide Straight Jeans
						</h1>
						<h2 className="text-pretty text-2xl font-normal text-slate-900">
							Light 100% cotton denim that offers comfort with style
						</h2>
						<Link to={"/shop/kids"} state={{ tags: ["SWT"] }}>
							<Button className="mt-7 rounded-full bg-white p-8 text-2xl font-medium text-black hover:bg-white/70">
								Shop Now <ChevronRightIcon size={30} />
							</Button>
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default kidsPage;
