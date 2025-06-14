import React from "react";
import electronics_desk_1 from "@/assets/Frontend_Assets/electronics_desk_1.jpg";
import electronics_desk_2 from "@/assets/Frontend_Assets/electronics_desk_2.jpg";
import electronics_desk_3 from "@/assets/Frontend_Assets/electronics_desk_3.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const Electronics = () => {
	return (
		<div className="overflow-hidden">
			<div className="h-screen snap-y snap-mandatory overflow-y-scroll">
				<section className="relative flex h-screen w-full snap-start items-center justify-center object-cover">
					<img
						src={electronics_desk_3}
						loading="lazy"
						alt=""
						className="h-full w-full object-cover"
					/>
					<div className="absolute">
						<Link to={"/shop/electronics"} state={{ filter: "ELE" }}>
							<Button className="mt-7 rounded-full bg-white p-8 text-2xl font-medium text-black hover:bg-white/70">
								Shop Now <ChevronRightIcon size={30} />
							</Button>
						</Link>
					</div>
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center">
					<img
						src={electronics_desk_1}
						loading="lazy"
						alt=""
						className="h-full w-full object-cover"
					/>
					<div className="absolute">
						<Link to={"/shop/electronics"} state={{ filter: "ELE" }}>
							<Button className="mt-7 rounded-full bg-white p-8 text-2xl font-medium text-black hover:bg-white/70">
								Shop Now <ChevronRightIcon size={30} />
							</Button>
						</Link>
					</div>
				</section>
				<section className="relative flex h-screen w-full snap-start items-center justify-center object-cover">
					<img
						src={electronics_desk_2}
						loading="lazy"
						alt=""
						className="h-full w-full object-cover"
					/>
					<div className="absolute">
						<Link to={"/shop/electronics"} state={{ filter: "ELE" }}>
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

export default Electronics;
